const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers['authorization']
    console.log(token);
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyUser);
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};

module.exports = auth;