const jwt = require("jsonwebtoken");
const register = require("../models/regSchema");
const login = require('../controllers/login')
  
const auth = async (req, res, next) => {
  try {
    const token = req.headers['authorization']
    console.log(token);
    const verifyUser =  jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyUser);
    next();
  } catch (error) {
    res.status(401).send("unauthorized");
  }
};

module.exports = auth;

module.exports = auth;   