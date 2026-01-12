require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

// -------------------- Middleware --------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/image", express.static("img"));

// Optional CORS headers for cross-platform (kept for safety)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// -------------------- Routes --------------------
const routes = require("./routes/menu");
const router = require("../Backend/routes/router");
const regRoute = require("./routes/regRoutes");
const loginRoute = require("./routes/loginRoutes");
const bookingRoute = require("./routes/booking");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
const staffManagementRoutes = require("./routes/staffManagementRoutes");
const profileRoutes = require("./routes/profile");
const orderRoutes = require("./routes/order");

app.use("/", router);
app.use("/registration", regRoute);
app.use("/login", loginRoute);
app.use("/api/user/booking", bookingRoute);
app.use("/menu", routes);
app.use("/forgot-password", forgotPasswordRoutes);
app.use("/api/user/profile", profileRoutes);
app.use("/staff-management", staffManagementRoutes);
app.use("/order", orderRoutes);

// -------------------- Database Connection --------------------
const connect = require("./db/conn");
connect.connectdb();

// -------------------- Server --------------------
app.listen(port, () => {
  console.log(`Server run on port: ${port}`);
});