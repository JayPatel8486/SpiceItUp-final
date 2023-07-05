require("dotenv").config();
const express = require("express");
const routes = require("./routes/menu");
const Menu = require("./models/menu");
const app = express();
const router = require("../Backend/routes/router");

const port = process.env.PORT || 4000;

// app.use("/* ", cors());  
// app.options("/*", cors()); 

app.use(express.json());      

const route = require("./routes/regRoutes"); 
const lroutes = require("./routes/loginRoutes");
const broutes = require("./routes/booking");
const froutes = require("./routes/forgotPasswordRoutes");
const sroutes = require("./routes/staffManagementRoutes");
const proutes = require("./routes/payment");
const profileRoutes = require("./routes/profile")
const oroutes = require("./routes/order");
const connect = require("./db/conn");
connect.connectdb();
const cookieParser = require("cookie-parser");

const registrationSchema = require("./models/regSchema");
const loginSchema = require("./models/loginSchema");
const forgoPassword = require("./models/forgoPasswordSchema");
const auth = require("./middleware/auth");

const bcrypt = require("bcrypt");

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use("/image", express.static("img"))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
 
app.use('/',router); //Importing Router 
app.use("/registration", route);
app.use("/login", lroutes);
app.use("/api/user/booking", broutes);
app.use("/menu", routes);
app.use('/forgot-password', froutes);
app.use('/api/user/profile', profileRoutes)
app.use('/staff-management', sroutes);
app.use("/order", oroutes);
app.use("/payment/pay",proutes);

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("Connection successfull!");
});
  