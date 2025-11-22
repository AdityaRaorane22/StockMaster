const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Warehouse Schema
const warehouseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  address: { type: String, required: true }
}, { timestamps: true });

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

// Location Schema
const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortCode: { type: String, required: true },
  warehouse: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true }
}, { timestamps: true });

const Location = mongoose.model("Location", locationSchema);

// ============ WAREHOUSE ROUTES ============

// GET all warehouses
app.get("/api/warehouses", async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single warehouse
app.get("/api/warehouses/:id", async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    res.json(warehouse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create warehouse
app.post("/api/warehouses", async (req, res) => {
  try {
    const warehouse = new Warehouse(req.body);
    await warehouse.save();
    res.status(201).json(warehouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update warehouse
app.put("/api/warehouses/:id", async (req, res) => {
  try {
    const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(warehouse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE warehouse
app.delete("/api/warehouses/:id", async (req, res) => {
  try {
    await Warehouse.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ LOCATION ROUTES ============

// GET all locations
app.get("/api/locations", async (req, res) => {
  try {
    const filter = req.query.warehouse ? { warehouse: req.query.warehouse } : {};
    const locations = await Location.find(filter).populate("warehouse");
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single location
app.get("/api/locations/:id", async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).populate("warehouse");
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create location
app.post("/api/locations", async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    const populated = await location.populate("warehouse");
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update location
app.put("/api/locations/:id", async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("warehouse");
    res.json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE location
app.delete("/api/locations/:id", async (req, res) => {
  try {
    await Location.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stock Schema
const stockSchema = new mongoose.Schema({
  product: { type: String, required: true },
  perUnitCost: { type: Number, required: true },
  onHand: { type: Number, required: true, default: 0 },
  freeToUse: { type: Number, required: true, default: 0 }
}, { timestamps: true });

const Stock = mongoose.model("Stock", stockSchema);

// ============ STOCK ROUTES ============

// GET all stock
app.get("/api/stocks", async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single stock
app.get("/api/stocks/:id", async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create stock
app.post("/api/stocks", async (req, res) => {
  try {
    const stock = new Stock(req.body);
    await stock.save();
    res.status(201).json(stock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update stock
app.put("/api/stocks/:id", async (req, res) => {
  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(stock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE stock
app.delete("/api/stocks/:id", async (req, res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ PRODUCT SCHEMA ============
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  unitOfMeasure: { type: String, required: true },
  perUnitCost: { type: Number, required: true }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

// ============ RECEIPT SCHEMA ============
const receiptSchema = new mongoose.Schema({
  reference: { type: String, required: true, unique: true },
  from: { type: String, default: "vendor" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },
  contact: { type: String, required: true },
  scheduledDate: { type: Date, required: true },
  status: { type: String, enum: ["Draft", "Waiting", "Ready", "Done", "Cancelled"], default: "Draft" },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true }
  }],
  sourceDoc: { type: String },
  responsiblePerson: { type: String }
}, { timestamps: true });

const Receipt = mongoose.model("Receipt", receiptSchema);

// ============ DELIVERY SCHEMA ============
const deliverySchema = new mongoose.Schema({
  reference: { type: String, required: true, unique: true },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },
  to: { type: String, default: "customer" },
  contact: { type: String, required: true },
  scheduledDate: { type: Date, required: true },
  status: { type: String, enum: ["Draft", "Waiting", "Ready", "Done", "Cancelled"], default: "Draft" },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true }
  }],
  deliveryAddress: { type: String },
  responsiblePerson: { type: String },
  operationType: { type: String }
}, { timestamps: true });

const Delivery = mongoose.model("Delivery", deliverySchema);

// ============ PRODUCT ROUTES ============
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ RECEIPT ROUTES ============
app.get("/api/receipts", async (req, res) => {
  try {
    const receipts = await Receipt.find()
      .populate("to")
      .populate("products.product");
    res.json(receipts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/receipts/:id", async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id)
      .populate("to")
      .populate("products.product");
    res.json(receipt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/receipts", async (req, res) => {
  try {
    // Auto generate reference
    const count = await Receipt.countDocuments();
    const reference = `WH/IN/${String(count + 1).padStart(5, "0")}`;
    const receipt = new Receipt({ ...req.body, reference });
    await receipt.save();
    const populated = await receipt.populate(["to", "products.product"]);
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/receipts/:id", async (req, res) => {
  try {
    const receipt = await Receipt.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("to")
      .populate("products.product");
    res.json(receipt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/receipts/:id", async (req, res) => {
  try {
    await Receipt.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ DELIVERY ROUTES ============
app.get("/api/deliveries", async (req, res) => {
  try {
    const deliveries = await Delivery.find()
      .populate("from")
      .populate("products.product");
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/deliveries/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id)
      .populate("from")
      .populate("products.product");
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/deliveries", async (req, res) => {
  try {
    const count = await Delivery.countDocuments();
    const reference = `WH/OUT/${String(count + 1).padStart(5, "0")}`;
    const delivery = new Delivery({ ...req.body, reference });
    await delivery.save();
    const populated = await delivery.populate(["from", "products.product"]);
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/deliveries/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate("from")
      .populate("products.product");
    res.json(delivery);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/deliveries/:id", async (req, res) => {
  try {
    await Delivery.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});