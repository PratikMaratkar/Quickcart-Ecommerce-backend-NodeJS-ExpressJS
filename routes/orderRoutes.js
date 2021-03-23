const express = require("express");
const router = express.Router();

const {
   getOrderById,
  createOrder,
   getAllOrders,
   deleteOrder,
   getOrder
} = require("../controller/orderController");

router.param("orderId", getOrderById);


router.post("/order/create",createOrder);
router.get("/order", getAllOrders);
router.get("/order/:orderId", getOrder);
router.delete("/order/:orderId", deleteOrder);

module.exports = router;