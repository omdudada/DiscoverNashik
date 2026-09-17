const express = require("express");
const ctrl = require("../controllers/nearby.controller");
const router = express.Router();
router.get("/", ctrl.nearby); // GET /api/nearby?lat=..&lng=..&radiusKm=..&category=..
module.exports = router;
