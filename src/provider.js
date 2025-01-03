import express, { json } from "express";

const app = express();
app.use(json());

// Mock product data
const products = [
  { id: 1, name: "Product A", price: 100 },
  { id: 2, name: "Product B", price: 150 },
];

// Endpoint to get product by ID
app.get("/product/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id, 10));
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Provider API running on port ${port}`);
});

export default { app };
