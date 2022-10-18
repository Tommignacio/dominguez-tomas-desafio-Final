const { Schema } = require("mongoose");

const OrderSchema = new Schema({
  order: { type: Number, required: true },
  author: {
    type: String,
    required: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"]
  },
  items: [
    {
      products: [{ type: Schema.Types.ObjectId, ref: "product" }],
      amount: { type: Number, required: true }
    }
  ],
  status: { type: String, required: true, default: "generada" },
  address: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});

module.exports = OrderSchema;