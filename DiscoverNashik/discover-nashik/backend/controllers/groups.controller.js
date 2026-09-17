const crypto = require("crypto");
const Group = require("../models/mongo/Group");
const GroupMember = require("../models/mongo/GroupMember");
const GroupMessage = require("../models/mongo/GroupMessage");

function generateGroupCode() {
  return crypto.randomBytes(3).toString("hex").toUpperCase(); // e.g. "A1B2C3"
}

async function createGroup(req, res, next) {
  try {
    const { deviceId, displayName, groupName } = req.body;
    const code = generateGroupCode();
    const group = await Group.create({ code, name: groupName, createdByDeviceId: deviceId });
    await GroupMember.create({ groupId: group._id, deviceId, displayName });
    res.status(201).json({ group, joinCode: code });
  } catch (err) {
    next(err);
  }
}

async function joinGroup(req, res, next) {
  try {
    const { code, deviceId, displayName } = req.body;
    const group = await Group.findOne({ code: code.toUpperCase() });
    if (!group) return res.status(404).json({ error: "Group not found" });
    const member = await GroupMember.create({ groupId: group._id, deviceId, displayName });
    await GroupMessage.create({
      groupId: group._id, fromDeviceId: deviceId, fromDisplayName: displayName,
      text: `${displayName} joined the group`, type: "system",
    });
    res.status(201).json({ group, member });
  } catch (err) {
    next(err);
  }
}

async function getGroupMembers(req, res, next) {
  try {
    const members = await GroupMember.find({ groupId: req.params.groupId, status: { $ne: "left" } });
    res.json(members);
  } catch (err) {
    next(err);
  }
}

// Realtime note: this REST endpoint updates the authoritative record;
// live propagation to other members' screens is done over a Socket.IO
// connection (room = groupId) set up alongside this Express app, so
// members see location/status updates without polling.
async function updateMemberStatus(req, res, next) {
  try {
    const { deviceId, status, lat, lng } = req.body;
    const member = await GroupMember.findOneAndUpdate(
      { groupId: req.params.groupId, deviceId },
      { status, ...(lat && lng ? { lastLocation: { lat, lng, updatedAt: new Date() } } : {}) },
      { new: true }
    );
    if (status === "misplaced") {
      await GroupMessage.create({
        groupId: req.params.groupId, fromDeviceId: deviceId, fromDisplayName: member?.displayName ?? "Member",
        text: "needs help — marked as misplaced", type: "misplaced-alert",
      });
    }
    res.json(member);
  } catch (err) {
    next(err);
  }
}

async function sendMessage(req, res, next) {
  try {
    const { deviceId, displayName, text } = req.body;
    const message = await GroupMessage.create({
      groupId: req.params.groupId, fromDeviceId: deviceId, fromDisplayName: displayName, text,
    });
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
}

async function getMessages(req, res, next) {
  try {
    const messages = await GroupMessage.find({ groupId: req.params.groupId }).sort({ createdAt: 1 }).limit(200);
    res.json(messages);
  } catch (err) {
    next(err);
  }
}

module.exports = { createGroup, joinGroup, getGroupMembers, updateMemberStatus, sendMessage, getMessages };
