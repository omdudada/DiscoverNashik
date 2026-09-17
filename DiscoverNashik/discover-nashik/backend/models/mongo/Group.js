const { mongoose } = require("../../config/db.mongo");

const GroupSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String },
    createdByDeviceId: { type: String, required: true }, // pilgrims are anonymous — device/session id, not a user account
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);
