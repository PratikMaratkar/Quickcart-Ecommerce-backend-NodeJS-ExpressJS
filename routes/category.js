const express = require('express')

const router = express.Router();

const { 
    createCategory,
    getAllCategory,
    getCategorybyId,
    removeCategory,
    updateCategory
} = require("../controller/category.js");

router.param("categoryId", getCategorybyId);

console.log("I am in routes");

router.post("/category/create/",createCategory);    
router.get("/category/getallcategories/",getAllCategory);  
router.post("/removeCategory",getAllCategory);      
router.delete("/category/:categoryId",removeCategory);  
router.put("/category/:categoryId",updateCategory);

module.exports = router;



