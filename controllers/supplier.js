import Supplier from "../models/supplier.js";

export const createSupplier = async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).json({ message: "Supplier created!", data: supplier });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json({ message: "Supplier updated!", data: supplier });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    res.status(200).json({ message: "Supplier deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};