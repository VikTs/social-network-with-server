const { Schema, model, Types } = require("mongoose");

const schema = new Schema({  
  isRead: String,
  messageId: { type: Types.ObjectId, ref: "Message" },
  userId: { type: Types.ObjectId, ref: "User" }
});

module.exports = model("MessageStatus", schema); 