const { Order, ProductCart } = require("../model/OrderModel");


exports.createOrder = (req, res) => 
{
const order = new Order(req.body);

  order.save((err, orderData) => 
  {
    if (err) 
    {
      return res.status(400).json({
        error: "Failed to save your order in DB"
      });
    }
    res.json(orderData);
  });
};


// to read all orders
exports.getAllOrders =
   (req, res) => 
  {
    Order.find().exec((err, orderData) => {
      if (err) {
        return res.status(400).json({
          error: "NO Orders  found"
        });
      }
      
      res.json(orderData);

    });
  };


// to read order by ID
exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
 .populate("products.product", "name price")
 .exec((err, order) => {
   if (err) {
     return res.status(400).json({
       error: "NO order found in DB"
     });
   }
   req.order = order;
   next();
 });
};


exports.getOrder = (req, res) => 
{
    return res.json(req.order);
};


//to delete order by ID
exports.deleteOrder = (req, res) => {
  let order = req.order;
  
  order.remove((err, deletedOrder) => {
      if (err) 
      {
         return res.status(400).json
         ({
           error: "Failed to delete the order!!"
          });
       }
       res.json({
         message: "Successfully deleted!!",
       });
     });
   };