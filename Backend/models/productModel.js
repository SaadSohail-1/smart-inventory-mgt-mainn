import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the product name"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please enter product category"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: [true, "Please enter product quantity"],
      min: [0, "Quantity cannot be negative"],
    },
    supplier: {
      type: String,
      default: "Unknown Supplier",
    },
    dateAdded: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


const Product = mongoose.model("Product", productSchema, "products");

export default Product;
