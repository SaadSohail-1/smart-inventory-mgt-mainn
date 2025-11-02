import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  priceAtOrder: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  total: { type: Number, required: true },
  type: { type: String, enum: ["purchase", "sale"], required: true }, 
  status: { type: String, enum: ["pending","processed","cancelled"], default: "pending" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", default: null },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);