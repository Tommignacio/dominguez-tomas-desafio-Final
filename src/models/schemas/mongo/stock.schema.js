const { Schema } = require("mongoose");

const StockSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: "product" }],
  stock: { type: Number, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});

module.exports = StockSchema;