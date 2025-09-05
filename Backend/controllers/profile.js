const register = require("../models/regSchema");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const getSpecificUser = async (req, res) => {
  try {
    const cid = req.params.cid;
    const user = await register.findById(cid);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await register.findByIdAndUpdate(
      { _id: new ObjectId(req.params.cid) },
      req.body
    );
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send(user);
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const finduser = await register.findById(req.params.cid);
    if (!finduser) {
      return res.status(404).json({ error: "User not found" });
    }

    const oldpassword = req.body.password;
    const verifyuser = await bcrypt.compare(oldpassword, finduser.password);

    if (!verifyuser) {
      return res.status(400).json({ error: "Old password does not match" });
    }

    const newPassword = req.body.newPassword;
    const hashPassword = await bcrypt.hash(newPassword, 12);

    const updatedPassword = await register.findByIdAndUpdate(
      { _id: finduser._id },
      { password: hashPassword }
    );
    return res.status(200).send(updatedPassword);
  } catch (err) {
    console.error("Error updating password:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await register.findByIdAndDelete(req.params.cid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addUser = async (req, res) => {
  try {
    const user = await register.create(req.body);
    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getSpecificUser,
  updateUser,
  deleteUser,
  addUser,
  updatePassword,
};
