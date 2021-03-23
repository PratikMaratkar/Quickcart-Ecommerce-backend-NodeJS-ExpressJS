var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { register,
        login,
        getAllUsers,
        getUserById,
        getUser,
        deleteUser,
        updateUser
      } = require("../controller/UserController");

      router.param("userId", getUserById);
      router.get("/user", getAllUsers);
      router.get("/user/:userId", getUser);
      router.delete("/user/:userId", deleteUser);
      router.put("/user/:userId",updateUser);

router.post("/register",
[
    check("name", "Name should be at least of 2 characters").isLength({ min: 2 }),
    check("email", "Check your email again!! ").isEmail(),
    check("password", "password should be at least 6 char").isLength({ min: 6 })
  ],
  register
);

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 })
  ],
  login
);

module.exports = router;