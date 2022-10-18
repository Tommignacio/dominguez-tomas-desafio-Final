const { Schema } = require("mongoose");

const MessageSchema = new Schema({
  renderUserAccount: { type: Schema.Types.ObjectId, ref: "user" },
  author: { type: Schema.Types.ObjectId, ref: "user" },
  nickname: { type: String, required: true },
  message: { type: String, required: true },
  route: { type: Object, required: false },
  type: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});

module.exports = MessageSchema;