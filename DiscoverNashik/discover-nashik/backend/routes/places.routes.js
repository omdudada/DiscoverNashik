const express = require("express");
const { requireAuth } = require("../middleware/auth");
const ctrl = require("../controllers/places.controller");

const router = express.Router();

// Public — no auth required, matches "pilgrims never need an account".
router.get("/", ctrl.listPlaces);
router.get("/:id", ctrl.getPlace);

// Admin-only writes.
router.post("/", requireAuth("admin"), ctrl.createPlace);
router.patch("/:id", requireAuth("admin"), ctrl.updatePlace);
router.delete("/:id", requireAuth("admin"), ctrl.deletePlace);

module.exports = router;
