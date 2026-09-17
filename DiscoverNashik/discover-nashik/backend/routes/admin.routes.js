const express = require("express");
const { requireAuth } = require("../middleware/auth");
const ctrl = require("../controllers/admin.controller");

const router = express.Router();

router.post("/login", ctrl.login);
router.get("/analytics", requireAuth("admin"), ctrl.analytics);

module.exports = router;
