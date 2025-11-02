import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null }, // for tree
});

export default mongoose.model("Category", categorySchema);