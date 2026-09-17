const LostReport = require("../models/mongo/LostReport");
const FoundReport = require("../models/mongo/FoundReport");

async function createLostReport(req, res, next) {
  try {
    const { description, photoUrl, lastSeenLocation, dateTime, identifyingInfo, contactInfo } = req.body;
    const report = await LostReport.create({
      description, photoUrl, lastSeenLocation, dateTime, identifyingInfo, contactInfo,
    });
    res.status(201).json(report);
  } catch (err) {
    next(err);
  }
}

async function createFoundReport(req, res, next) {
  try {
    const { description, photoUrl, foundLocation, dateTime, contactInfo } = req.body;
    const report = await FoundReport.create({ description, photoUrl, foundLocation, dateTime, contactInfo });
    res.status(201).json(report);
  } catch (err) {
    next(err);
  }
}

// Only shows admin-approved reports publicly — moderation gate, and
// contact info is only exposed once an admin has verified the report
// to protect reporter privacy (see spec section on Lost & Found privacy).
async function listReports(req, res, next) {
  try {
    const { type } = req.query;
    const Model = type === "found" ? FoundReport : LostReport;
    const reports = await Model.find({ moderation: "approved" }).sort({ createdAt: -1 }).limit(100);
    res.json(reports);
  } catch (err) {
    next(err);
  }
}

async function moderateReport(req, res, next) {
  try {
    const { type, id } = req.params;
    const { decision } = req.body; // 'approved' | 'rejected'
    const Model = type === "found" ? FoundReport : LostReport;
    const report = await Model.findByIdAndUpdate(id, { moderation: decision }, { new: true });
    if (!report) return res.status(404).json({ error: "Report not found" });
    res.json(report);
  } catch (err) {
    next(err);
  }
}

module.exports = { createLostReport, createFoundReport, listReports, moderateReport };
