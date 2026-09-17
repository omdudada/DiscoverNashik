const express = require("express");
const rateLimit = require("express-rate-limit");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { requireAuth } = require("../middleware/auth");
const ctrl = require("../controllers/lostfound.controller");

const router = express.Router();

// Tighter limit than the global API limiter — Lost & Found is a common
// spam/abuse target and reports are unauthenticated by design.
const submitLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10 });

router.get("/", ctrl.listReports); // GET /api/lost-found?type=lost|found

router.post(
  "/lost",
  submitLimiter,
  [body("description").notEmpty(), body("dateTime").notEmpty(), body("contactInfo").notEmpty()],
  validate,
  ctrl.createLostReport
);

router.post(
  "/found",
  submitLimiter,
  [body("description").notEmpty(), body("dateTime").notEmpty(), body("contactInfo").notEmpty()],
  validate,
  ctrl.createFoundReport
);

// Admin moderation.
router.patch("/:type/:id/moderate", requireAuth("admin"), ctrl.moderateReport);

module.exports = router;
