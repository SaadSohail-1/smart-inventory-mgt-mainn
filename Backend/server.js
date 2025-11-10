import express from "express";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config({ path: "./.env" });


import connectDb from "./config/db.js";

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());




import orderRoutes from "./routes/orderRoutes.js";  
import productRoutes from "./routes/productRoutes.js";
import activityRoutes from './routes/activityRoutes.js';

// import categoryRoutes from "./routes/categoryRoutes.js";
// import supplierRoutes from "./routes/supplierRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";

// Use Routes
app.use("/api/orders", orderRoutes);  // Order routes
app.use("/api/products", productRoutes);
app.use('/api/activities', activityRoutes);

// app.use("/api/categories", categoryRoutes);
// app.use("/api/suppliers", supplierRoutes);
  // app.use("/api/users", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API is running successfully...");
});

const PORT =  5000;


app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  connectDb();
});
