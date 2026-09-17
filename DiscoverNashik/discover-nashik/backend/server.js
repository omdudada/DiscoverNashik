require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const errorHandler = require("./middleware/errorHandler");

const placesRoutes = require("./routes/places.routes");
const searchRoutes = require("./routes/search.routes");
const nearbyRoutes = require("./routes/nearby.routes");
const eventsRoutes = require("./routes/events.routes");
const lostFoundRoutes = require("./routes/lostfound.routes");
const groupsRoutes = require("./routes/groups.routes");
const businessRoutes = require("./routes/business.routes");
const adminRoutes = require("./routes/admin.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// General API rate limit; tighter limits are applied per-route where
// abuse risk is higher (e.g. Lost & Found submissions, AI chat).
app.use(
  "/api",
  rateLimit({ windowMs: 15 * 60 * 1000, max: 300, standardHeaders: true, legacyHeaders: false })
);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/places", placesRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/nearby", nearbyRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/lost-found", lostFoundRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);

app.use((req, res) => res.status(404).json({ error: "Not found" }));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Discover Nashik API listening on port ${PORT}`));

module.exports = app;
