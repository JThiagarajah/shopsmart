import express from "express";
import {
  createSupplier,
  getAllSuppliers,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplier.js";

const router = express.Router();

router.post("/", createSupplier);
router.get("/", getAllSuppliers);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;