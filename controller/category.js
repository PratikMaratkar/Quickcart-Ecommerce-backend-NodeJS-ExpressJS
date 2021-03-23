const Category = require("../model/category.js");

//for category creation 
  exports.createCategory = (req, res) => 
  {
    const category = new Category(req.body);
    category.save((err, backend_category) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to save category in DB"
        });
      }
      res.json({ backend_category });
    });
  };    

//to read all categories
  exports.getAllCategory = (req, res) => 
  {
    Category.find().exec((err, categories) => 
    {
      if (err) {
        return res.status(400).json({
          error: "NO categories found"
        });
      }    
      res.json(categories);
    });
  };



// to read category by ID
  exports.getCategorybyId = (req, res, next, id) => 
{
  Category.findById(id)
    .exec((err, categoryData) => 
      {
        if (err) {
          return res.status(400).json({
          error: "Category not found!!"
        });
      }   

      req.category = categoryData; 
      next();
    
    });
  };


  
// to remove category
  exports.removeCategory = (req, res) =>
   {
    const category = req.category;
  
    category.remove((err, category) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this category!!!"
        });
      }
      res.json({
        message: "Successfully deleted!!!"
      });
    });
  };


  // to update category
  exports.updateCategory = (req, res) =>
   {
    const category = req.category;

    category.name = req.body.name;
  
    category.save((err, updatedCategory) => 
    {
      if (err) {
        return res.status(400).json({
          error: "Failed to update this category!!!"
        });
      }
      res.json(updatedCategory);
    });
  };
