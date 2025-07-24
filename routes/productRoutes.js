const express = require("express");
const router = express.Router();

const dummyProducts = [
  { id: 1, title: "Red Saree", price: 2000, image: "https://via.placeholder.com/150" },
  { id: 2, title: "Blue Kurta", price: 1500, image: "https://via.placeholder.com/150" },
  { id: 3, title: "Handloom Dupatta", price: 1200, image: "https://via.placeholder.com/150" },
];

router.get("/", (req, res) => {
  res.status(200).json(dummyProducts);
});

module.exports = router;
