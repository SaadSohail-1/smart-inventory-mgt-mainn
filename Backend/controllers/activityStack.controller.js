import asyncHandler from "../utils/asynchandler.js";
import { inventoryActivityStack } from "../utils/stack.js";
import Product from "../models/productModel.js";

// ✅ Update product quantity (add/remove stock)
export const updateProductQuantity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, action } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // ✅ Record the change in the activity stack
  inventoryActivityStack.push({
    productId: product._id,
    name: product.name,
    previousQuantity: product.quantity,
    newQuantity: action === "add"
      ? product.quantity + quantity
      : product.quantity - quantity,
    action,
    timestamp: new Date(),
  });

  // ✅ Update the product quantity
  if (action === "add") {
    product.quantity += quantity;
  } else if (action === "remove") {
    if (product.quantity < quantity) {
      res.status(400);
      throw new Error("Insufficient quantity in stock");
    }
    product.quantity -= quantity;
  } else {
    res.status(400);
    throw new Error("Invalid action. Use 'add' or 'remove'.");
  }

  const updatedProduct = await product.save();

  res.status(200).json({
    success: true,
    message: `Product quantity ${action}ed successfully.`,
    product: updatedProduct,
  });
});

// ✅ Get inventory activity (history of changes)
export const getInventoryActivity = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    total: inventoryActivityStack.size(),
    activities: inventoryActivityStack.getAllItems(),
  });
});
