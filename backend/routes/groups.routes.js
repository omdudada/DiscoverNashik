const express = require("express");
const ctrl = require("../controllers/groups.controller");
const router = express.Router();

// All unauthenticated — groups are identified by device id + join code,
// not user accounts, matching the "no login for pilgrims" requirement.
router.post("/", ctrl.createGroup);
router.post("/join", ctrl.joinGroup);
router.get("/:groupId/members", ctrl.getGroupMembers);
router.patch("/:groupId/members/status", ctrl.updateMemberStatus);
router.post("/:groupId/messages", ctrl.sendMessage);
router.get("/:groupId/messages", ctrl.getMessages);

module.exports = router;
