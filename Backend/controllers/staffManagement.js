const registrationDetails = require("../models/regSchema");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const cred = require('../constants/const')

// Add staff
const addStaff = async (req, res) => {
  try {
    const { first_name, last_name, gender, phone, email, password } = req.body;

    if (!first_name || !last_name || !gender || !phone || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email already exists
    const existingStaff = await registrationDetails.findOne({ email });
    if (existingStaff) {
      return res.status(409).json({ error: "Email is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    // 🔹 Create staff user
    const newStaff = new registrationDetails({
      first_name,
      last_name,
      gender,
      phone,
      email,
      password: hashedPassword,
      user_role: "staff",
    });

    const staff = await newStaff.save();

    // 🔹 Send staff details email
    const transport = nodemailer.createTransport({
      host: cred.NODEMAILER_HOST,
      auth: {
        user: cred.ADD_STAFF_USER_EMAIL,
        pass: cred.ADD_STAFF_USER_PASSWORD,
      },
    });

    ejs.renderFile(
      path.resolve("./views/staffEmail.ejs"),
      { first_name, email, password }, // send plain password only in email, not DB
      (err, data) => {
        if (err) {
          console.error("EJS render error:", err);
        } else {
          const mailOptions = {
            from: cred.ADD_STAFF_USER_EMAIL,
            to: email,
            subject: "Staff Account Created",
            html: data,
          };

          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Email send error:", error);
            } else {
              console.log("Staff email sent: %s", info.messageId);
            }
          });
        }
      }
    );

    return res.status(201).send(staff);
  } catch (err) {
    console.error("Error adding staff:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// Get Staff details
const getStaffDetails = async (req, res) => {
  try {
    let all_staffs = await registrationDetails.find({ user_role: "staff" });
    if (!all_staffs || all_staffs.length === 0) {
      return res.status(404).json({ error: "No staff details found" });
    }
    console.log("Staff details fetched:", all_staffs);
    return res.status(200).send(all_staffs);
  } catch (err) {
    console.error("Error fetching staff details:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// Delete Staff
const deleteStaff = async (req, res) => {
  try {
    let deleteStaff = await registrationDetails.findByIdAndDelete(req.params.id);

    if (!deleteStaff) {
      return res.status(404).json({ error: "Staff not found!" });
    }
    console.log("Deleted staff:", deleteStaff);
    return res.status(200).send(deleteStaff);
  } catch (err) {
    console.error("Error fetching staff details:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}


// Update Staff
const updateStaff = async (req, res) => {
  try {
    let id = req.params.id;
    let updateStaff = await registrationDetails.findByIdAndUpdate({ _id: id }, req.body);
    if (!updateStaff) {
      return res.status(404).json({ error: "Staff not found!" });
    }
    console.log("Updated staff:", staff);
    return res.status(200).send(updateStaff);
  } catch (e) {
    console.error("Error fetching staff details:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  addStaff,
  getStaffDetails,
  deleteStaff,
  updateStaff
};