import Product from "../models/productModel.js"; 
import asyncHandler from "../utils/asynchandler.js";
import { bubbleSort } from "../utils/sort.js";
import { binarySearchByKey } from "../utils/search.js";
import { logAction } from "../utils/logger.js";

// in-memory structures
let productArray = [];            // array mirror for DSA operations
const productHash = new Map();    // id -> product

// load cache helper
const loadCacheIfEmpty = async () => {
  if (productArray.length === 0) {
    productArray = await Product.find().lean();
    productArray.forEach(p => productHash.set(String(p._id), p));
  }
};

// Create
export const addProduct = asyncHandler(async (req, res) => {
  const { name, category, price, quantity, supplier } = req.body;
  const created = await Product.create({ name, category, price, quantity, supplier });
  // update memory
  productArray.push(created);
  productHash.set(String(created._id), created);
  logAction(`CREATE product ${created._id} by API`);
  res.status(201).json(created);
});

// Get all (sorted by name)
export const getAllProducts = asyncHandler(async (req, res) => {
  // Always reload from DB to keep cache fresh
  const products = await Product.find().lean();
  // Refresh cache
  productArray = products;
  productHash.clear();
  products.forEach(p => productHash.set(String(p._id), p));

  // Optional: sort before sending
  const sorted = bubbleSort([...products], "name");
  res.json(sorted);
});


// Search by name (bubbleSort + binary search)
export const searchByName = asyncHandler(async (req, res) => {
  await loadCacheIfEmpty();
  const { name } = req.params;
  const sorted = bubbleSort([...productArray], "name");
  const found = binarySearchByKey(sorted, name, "name");
  if (!found) return res.status(404).json({ message: "Not found" });
  res.json(found);
});

// Get by ID (hash lookup)
export const getById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (productHash.has(id)) return res.json(productHash.get(id));
  const p = await Product.findById(id);
  if (!p) return res.status(404).json({ message: "Not found" });
  productHash.set(id, p);
  res.json(p);
});

// Update
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updated = await Product.findByIdAndUpdate(id, req.body, { new: true }).lean();
  if (!updated) return res.status(404).json({ message: "Not found" });
  // update in-memory
  productHash.set(id, updated);
  productArray = productArray.map(p => String(p._id) === id ? updated : p);
  logAction(`UPDATE product ${id}`);
  res.json(updated);
});

// Delete
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Product.findByIdAndDelete(id).lean();
  if (!deleted) return res.status(404).json({ message: "Not found" });
  productHash.delete(id);
  productArray = productArray.filter(p => String(p._id) !== id);
  logAction(`DELETE product ${id}`);
  res.json({ message: "Deleted" });
});


// not in use 
// Low-stock top-k 
export const lowStockTopK = asyncHandler(async (req, res) => {
  await loadCacheIfEmpty();
  const k = parseInt(req.query.k || "5", 10);
  
  // 1. Create a copy and sort by quantity (lowest first)
  const sortedProducts = [...productArray].sort((a, b) => a.quantity - b.quantity);
  
  // 2. Create queue and enqueue all products
  const queue = new Queue();
  sortedProducts.forEach(p => queue.enqueue(p));
  
  // 3. Get first k items (lowest quantities)
  const result = [];
  for (let i = 0; i < k && !queue.isEmpty(); i++) {
    result.push(queue.dequeue());
  }
  
  res.json(result);
});
