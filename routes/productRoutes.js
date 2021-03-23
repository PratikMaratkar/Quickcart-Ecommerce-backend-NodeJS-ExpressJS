const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getAllproduct,
  getProduct,
  deleteProduct,
  updateProduct
} = require("../controller/productController.js");

router.param("productId", getProductById);  

router.post("/product/create", createProduct);
router.get("/product/:productId", getProduct);
router.get("/product", getAllproduct);
router.delete("/product/:productId", deleteProduct);
router.put("/product/:productId",updateProduct);

module.exports = router;