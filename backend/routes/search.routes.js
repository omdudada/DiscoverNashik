const express = require("express");
const ctrl = require("../controllers/search.controller");
const router = express.Router();
router.get("/", ctrl.search); // GET /api/search?q=...
module.exports = router;
