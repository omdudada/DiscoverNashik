const { validationResult } = require("express-validator");

// Run after an express-validator chain to short-circuit with a 400 on
// the first validation failure, keeping controllers free of manual checks.
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: "Validation failed", details: errors.array() });
  }
  next();
}

module.exports = validate;
