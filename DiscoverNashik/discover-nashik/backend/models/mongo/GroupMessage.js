const { mongoose } = require("../../config/db.mongo");

const GroupMessageSchema = new mongoose.Schema(
  {
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    fromDeviceId: { type: String, required: true },
    fromDisplayName: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, enum: ["text", "misplaced-alert", "system"], default: "text" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GroupMessage", GroupMessageSchema);
