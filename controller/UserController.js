const User = require("../model/UserModel");
const { check, validationResult } = require("express-validator");


exports.register = (req, res) => 
{
    const errors = validationResult(req);
  
    if (!errors.isEmpty())
     {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }

    const user = new User(req.body);
   
    user.save((err, userData) => 
    {
        if (err) 
      {
        return res.status(400).json({
          err: "Not able to save user in Database!!"
        });
      }
      
      res.json({
        name: userData.name,
        email: userData.email,
        address: userData.address,
        id: userData._id
      });
    });
  };


  exports.login = (req, res) => 
  {
     const { email, password } = req.body;
   
     User.findOne({ email }, (err, user) => 
     {
       if (err || !user) {
         return res.status(400).json({
           error: "User email does not exists!!"
         });
       }
   
       if (!user.autheticate(password)) {
         return res.status(401).json({
           error: "Email and Password does not match!!"
         });
       }

       const { _id, name, email, address } = user;
       return res.json({  user: { _id, name, email, address } });
     });
   };


   // to read all users
exports.getAllUsers =
(req, res) => 
{
 User.find().exec((err, userData) => {
   if (err) {
     return res.status(400).json({
       error: "NO Users found"
     });
   }
   
   res.json(userData);

 });
};


// to read user by ID
exports.getUserById = (req, res, next, id) => {
User.findById(id)
.populate("products.product", "name price")
.exec((err, user) => {
if (err) {
  return res.status(400).json({
    error: "NO user found in DB"
  });
}
req.user = user;
next();
});
};


exports.getUser = (req, res) => 
{
 return res.json(req.user);
};


//to delete user by ID
exports.deleteUser = (req, res) => {
let user = req.user;

user.remove((err, deletedUser) => {
   if (err) 
   {
      return res.status(400).json
      ({
        error: "Failed to delete the user!!"
       });
    }
    res.json({
      message: "Successfully deleted!!",
    });
  });
};


 // to update user
 exports.updateUser = (req, res) =>
 {
  const user = req.user;

  user.name = req.body.name;
  user.email = req.body.email;
  user.password= req.body.password;
  user.mobile = req.body.mobile;
  user.address = req.body.address;

  user.save((err, updatedUser) => 
  {
    if (err) {
      return res.status(400).json({
        error: "Failed to update this category!!!"
      });
    }
    res.json(updatedUser);
  });
};

   