const { generateReply } = require("../services/ai.service");

async function chat(req, res, next) {
  try {
    const { message, locale } = req.body;
    if (!message) return res.status(400).json({ error: "message is required" });
    const reply = await generateReply(message, locale || "en");
    res.json({ reply });
  } catch (err) {
    next(err);
  }
}

module.exports = { chat };
