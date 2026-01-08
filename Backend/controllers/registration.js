const registrationDetails = require("../models/regSchema");
const bcrypt = require("bcrypt");

const postRegister = async (req, res) => {
  try {
    const { password, confirm_password, first_name, last_name, gender, phone, email } = req.body;

    if (password !== confirm_password) {
      res.status(400).send({ message: "Password and confirm password is not matched" })
    }

    // Check if email already exists
    const existingUser = await registrationDetails.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new registrationDetails({
      first_name,
      last_name,
      gender,
      phone,
      email,
      password: hashedPassword
    });

    const registered = await newUser.save();
    return res.status(201).send(registered);
  } catch (err) {
    console.error("Error in registration:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getRegDetails = async (req, res) => {
  try {
    const customers = await registrationDetails.find({ user_role: "customer" });

    if (!customers || customers.length === 0) {
      return res.status(404).send({ message: "No customers found" });
    }
    return res.status(200).send(customers);
  } catch (err) {
    console.error("Error fetching registration details:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  postRegister,
  getRegDetails
};
