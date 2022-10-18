const { Schema } = require("mongoose");

const CartSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "user" },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "stock" },
      amount: { type: Number, required: true }
    }
  ],
  address: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});

module.exports = CartSchema;