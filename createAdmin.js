import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URL);

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash("admin123", salt);

await mongoose.connection.db.collection("users").insertOne({
  name: "Joshua",
  email: "joshua@shopsmart.com",
  password: hashedPassword,
  createdAt: new Date(),
  updatedAt: new Date(),
});

console.log("✅ Admin user created successfully!");
console.log("📧 Email: joshua@shopsmart.com");
console.log("🔑 Password: admin123");

process.exit();