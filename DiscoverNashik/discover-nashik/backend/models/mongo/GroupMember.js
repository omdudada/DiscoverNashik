const { mongoose } = require("../../config/db.mongo");

const GroupMemberSchema = new mongoose.Schema(
  {
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    deviceId: { type: String, required: true },
    displayName: { type: String, required: true },
    lastLocation: {
      lat: Number,
      lng: Number,
      updatedAt: Date,
    },
    status: { type: String, enum: ["active", "misplaced", "left"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GroupMember", GroupMemberSchema);
