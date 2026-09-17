const mongoose = require("mongoose");

// High-write / loosely-structured data lives here: lost/found reports,
// groups, group members, group messages, live location pings.
async function connectMongo() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
}

module.exports = { connectMongo, mongoose };
