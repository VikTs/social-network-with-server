const { Schema, model, Types } = require("mongoose");

const schema = new Schema({  
  messageId: String,
  context: String,
  dateCreate: Date,
  chatId: { type: Types.ObjectId, ref: "Chat" },
  userId: { type: Types.ObjectId, ref: "User" }
});

module.exports = model("Message", schema); 