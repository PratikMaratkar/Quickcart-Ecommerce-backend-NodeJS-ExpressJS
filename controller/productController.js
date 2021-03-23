const Product = require("../model/productModel");

// for product creation
exports.createProduct = 
(req, res) =>
 {
 
  const product = new Product(req.body);
 
  product.save((err, category) => 
  {
    if (err) 
    {

      if(err.code === 11000 || err.code === 11001)
      {
        return res.status(400).json({
          error: "Duplicate Value " +req.body.name +",Value must be unique",
         
        });
      }
      else
      {
        return res.status(400).json({
          error: "NOT able to save category in DBs",
          messgae : err
         
        });
      }
      }

     
    res.json({ category });
  });
};

// to read all products
exports.getAllproduct =
   (req, res) => 
  {
    Product.find().exec((err, productData) => {
      if (err) {
        return res.status(400).json({
          error: "NO Products  found"
        });
      }
      
      res.json(productData);

    });
  };

// to read products by ID
exports.getProductById = (req, res, next, id) => 
{
  Product.findById(id)
    .populate("category")  
    .exec((err, productData) => 
    {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }

      req.product = productData;  

      next();
    
    });
};



exports.getProduct = (req, res) => 
{
    return res.json(req.product);
};


//to delete product by ID
exports.deleteProduct = (req, res) => {
let product = req.product;

product.remove((err, deletedProduct) => {
    if (err) 
    {
       return res.status(400).json
       ({
         error: "Failed to delete the product!!"
        });
     }
     res.json({
       message: "Successfully deleted!!",
     });
   });
 };


 // to update product
 exports.updateProduct = (req, res) =>
 {
  const product = req.product;

  product.name = req.body.name;
  product.description = req.body.description;
  product.price = req.body.price;
  product.category = req.body.category;

  product.save((err, updatedProduct) => 
  {
    if (err) {
      return res.status(400).json({
        error: "Failed to update this category!!!"
      });
    }
    res.json(updatedProduct);
  });
};
