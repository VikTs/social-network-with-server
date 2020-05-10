const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  chat_name: String,
  chat_description: String,
  members: Array,
  date_create: Date,
  owner_id: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Chat", schema); 