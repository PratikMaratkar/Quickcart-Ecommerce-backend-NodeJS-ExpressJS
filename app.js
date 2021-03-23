const mongoose = require('mongoose');
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = 3100

mongoose.connect('mongodb+srv://wisdomsprouts:wisdomsprouts@cluster0.rugs5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
 {useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=> {
    console.log("DB CONNECTED")
})

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const categoryRoutes = require("./routes/category.js");
const productRoutes = require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");


app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", userRoutes);


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


//http://localhost:3100/api/category/create                         ....to create category
//http://localhost:3100/api/category/getallcategories               ....to read all categories
//http://localhost:3100/api/category/6049c69b406c21097c01da11       ....to delete category by ID
//http://localhost:3100/api/category/6059bb1b42d4e6072411c6a8       ....to update category info by id
//http://localhost:3100/api/product/create                          ....to create product
//http://localhost:3100/api/product                                 ....to read all products
//http://localhost:3100/api/product/6048f515fadd8a2d2825b5ed        ....to read product by ID
//http://localhost:3100/api/product/604b271b689c5801e4f99c5e        ....to delete product by ID
//http://localhost:3100/api/product/6059f49ddb472d34c862dae2        ....to update product info by id
//http://localhost:3100/api/register                                ....to register as new user
//http://localhost:3100/api/login                                   ....to login as registered user
//http://localhost:3100/api/order/create                            ....to create orders
//http://localhost:3100/api/order                                   ....to read all orders
//http://localhost:3100/api/order/60532812e7ac9636bc3525b8          ....to read order by ID
//http://localhost:3100/api/order/6053316fe7ac9636bc3525ba          ....to delete order by ID
//http://localhost:3100/api/user                                    ....to read all users
//http://localhost:3100/api/user/605301f980ad7d20ac2e5bda           ....to read user by ID
//http://localhost:3100/api/user/60530a1e90944c2c3cfe2c4d           ....to delete user by ID
//http://localhost:3100/api/user/6058e5482d49180e780b224f           ....to update user info by id