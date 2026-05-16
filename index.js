import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/product.js";
import categoryRoutes from "./routes/category.js";
import supplierRoutes from "./routes/supplier.js";
import authRoutes from "./routes/auth.js";
import protect from "./middleware/auth.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Public Routes
app.use("/api/auth", authRoutes);

// Protected Routes
app.use("/api/products", protect, productRoutes);
app.use("/api/categories", protect, categoryRoutes);
app.use("/api/suppliers", protect, supplierRoutes);

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