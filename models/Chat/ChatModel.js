const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  // chat_id: String,
  chatName: String,
  chatDescription: String,
  membersId: Array,
  context: String,
  dateCreate: Date,
  ownerId: { type: Types.ObjectId, ref: "User" }
});

module.exports = model("Chat", schema); 