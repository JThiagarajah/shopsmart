import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/product.js";
import categoryRoutes from "./routes/category.js";
import supplierRoutes from "./routes/supplier.js";



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/suppliers", supplierRoutes);

// Root
app.get("/", (req, res) => {
  res.send("ShopSmart API is running...");
});

// Connect to MongoDB & Start Server
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ MongoDB Connected!");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Connection failed:", err.message);
  });