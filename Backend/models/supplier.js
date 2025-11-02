import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  contactEmail: { type: String },
  phone: { type: String },
  address: { type: String },
  leadTimeDays: { type: Number, default: 0 } // use for supplier ranking/graphs
});

export default mongoose.model("Supplier", supplierSchema);