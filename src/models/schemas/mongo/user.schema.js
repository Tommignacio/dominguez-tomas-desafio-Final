const { Schema } = require("mongoose");

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  birth: { type: Date, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"]
  },
  password: { type: String, required: true },
  avatar: { type: String },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});
UserSchema.index({ email: 1 });

module.exports = UserSchema;