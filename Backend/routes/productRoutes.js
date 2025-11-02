import express from "express";
import {
  addProduct,
  getAllProducts,
  searchByName,
  getById,
  updateProduct,
  deleteProduct,
  lowStockTopK,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", addProduct);                 // Create product
router.get("/", getAllProducts);              // Get all products
router.get("/search/:name", searchByName);    // Search (by name)
router.get("/lowstock/top", lowStockTopK);    //  Top-k Low Stock
router.get("/:id", getById);                  // Get by ID
router.put("/:id", updateProduct);            // Update
router.delete("/:id", deleteProduct);         // Delete

export default router;
