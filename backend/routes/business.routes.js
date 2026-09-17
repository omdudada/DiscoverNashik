const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { requireAuth } = require("../middleware/auth");
const ctrl = require("../controllers/business.controller");

const router = express.Router();

router.post(
  "/apply",
  [body("name").notEmpty(), body("contactInfo").notEmpty()],
  validate,
  ctrl.applyBusiness
);
router.get("/applications/:id", ctrl.getApplicationStatus);
router.patch("/applications/:id/review", requireAuth("admin"), ctrl.reviewApplication);

module.exports = router;
