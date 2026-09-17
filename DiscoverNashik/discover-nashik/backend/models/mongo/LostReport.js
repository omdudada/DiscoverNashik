const { mongoose } = require("../../config/db.mongo");

const LostReportSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    photoUrl: { type: String },
    lastSeenLocation: {
      label: String,
      lat: Number,
      lng: Number,
    },
    dateTime: { type: Date, required: true },
    identifyingInfo: { type: String },
    contactInfo: { type: String, required: true },
    status: { type: String, enum: ["open", "matched", "resolved"], default: "open" },
    moderation: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LostReport", LostReportSchema);
