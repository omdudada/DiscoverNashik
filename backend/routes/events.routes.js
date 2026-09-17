const express = require("express");
const { requireAuth } = require("../middleware/auth");
const ctrl = require("../controllers/events.controller");
const router = express.Router();

router.get("/", ctrl.listEvents); // public
router.post("/", requireAuth("admin"), ctrl.createEvent);

module.exports = router;
