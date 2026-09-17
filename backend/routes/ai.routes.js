const express = require("express");
const rateLimit = require("express-rate-limit");
const ctrl = require("../controllers/ai.controller");

const router = express.Router();
const aiLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 30 });

router.post("/chat", aiLimiter, ctrl.chat);

module.exports = router;
