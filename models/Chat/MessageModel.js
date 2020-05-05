const { Schema, model, Types } = require("mongoose");

const schema = new Schema({  
  context: String,
  date_create: Date,
  chat_id: { type: Types.ObjectId, ref: "Chat" },
  user_id: { type: Types.ObjectId, ref: "User" }
});

module.exports = model("Message", schema); 