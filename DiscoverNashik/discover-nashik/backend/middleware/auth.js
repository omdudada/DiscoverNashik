const jwt = require("jsonwebtoken");

// Only Admin and Business routes use this. Pilgrim-facing routes
// (places, search, nearby, lost-found submission, groups, AI chat)
// must stay unauthenticated per the product spec.
function requireAuth(requiredRole) {
  return function (req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authentication required" });
    }
    try {
      const token = header.slice("Bearer ".length);
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (requiredRole && payload.role !== requiredRole) {
        return res.status(403).json({ error: "Insufficient permissions" });
      }
      req.user = payload;
      next();
    } catch {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}

module.exports = { requireAuth };
