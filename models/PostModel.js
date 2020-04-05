const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  posts: [
    {
      id: Number,
      name: String,
      likesCount: Number,
      likesPeopleId: Array,
      date: Date,
    }
  ],
  owner: { type: Types.ObjectId, ref: "User" }
});

module.exports = model("Post", schema);
