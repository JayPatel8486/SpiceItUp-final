require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

// app.use("/* ", cors());  
// app.options("/*", cors());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/image", express.static("img"))
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const routes = require("./routes/menu");
const router = require("../Backend/routes/router");
const regRoute = require("./routes/regRoutes");
const loginRoute = require("./routes/loginRoutes");
const bookingRoute = require("./routes/booking");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
const staffManagementRoutes = require("./routes/staffManagementRoutes");
const profileRoutes = require("./routes/profile")
const orderRoutes = require("./routes/order");
 
app.use('/',router); //Importing Router 
app.use("/registration", regRoute);
app.use("/login", loginRoute);
app.use("/api/user/booking", bookingRoute);
app.use("/menu", routes);
app.use('/forgot-password', forgotPasswordRoutes);
app.use('/api/user/profile', profileRoutes)
app.use('/staff-management', staffManagementRoutes);
app.use("/order", orderRoutes);

const connect = require("./db/conn");
connect.connectdb();
app.listen(port, () => {
  console.log("Connection succefull!");
});
