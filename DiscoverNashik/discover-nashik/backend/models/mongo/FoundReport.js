const { mongoose } = require("../../config/db.mongo");

const FoundReportSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    photoUrl: { type: String },
    foundLocation: {
      label: String,
      lat: Number,
      lng: Number,
    },
    dateTime: { type: Date, required: true },
    contactInfo: { type: String, required: true },
    matchedLostReportId: { type: mongoose.Schema.Types.ObjectId, ref: "LostReport" },
    status: { type: String, enum: ["open", "matched", "resolved"], default: "open" },
    moderation: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoundReport", FoundReportSchema);
