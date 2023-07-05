const registrationDetails = require("../models/regSchema");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

// Add staff
const addStaff = async (req, res) => {
  try {

    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: "bharatdev114@gmail.com",
        pass: "ddvtbkzzexvyvusq"
      }
    });


      ejs.renderFile(path.resolve("./views/staffEmail.ejs"), { first_name: req.body.first_name, email: req.body.email, password: req.body.password  } ,(err, data) => {
        if (err) {
          console.log(err);
        } else {
          var mailOptions = {
            from: "bharatdev114@gmail.com",
            to: req.body.email,
            subject: "Staff Details",
            html: data
          };
    
          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
          });
        }
      });


    let add_staff = new registrationDetails({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_role: 'staff',
      gender: req.body.gender,
      phone: req.body.phone,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12)
    })
    if (req.body.first_name && req.body.last_name && req.body.gender &&
      req.body.phone && req.body.email && req.body.password) {
      const staff = await add_staff.save();

      console.log(staff);
      res.status(201).send(staff);

    }

    else {
      res.status(400).send({ "error": "Invalid data!" })
    }

  } catch (e) {
    res.status(500).send({ "error": "Something went wrong!" });
  }
};


// Get Staff
const getStaffDetails = async (req, res) => {
  try {
    let all_staffs = await registrationDetails.find({ user_role: "staff" });

    if (all_staffs) {
      console.log(all_staffs);
      return res.status(200).send(all_staffs);

    } else {
      return res.status(404).send({ "error": "Staff details not found!" });
    }

  } catch (e) {
    res.status(500).send({ "error": "Something went wrong!" });
  }
};


// Delete Staff
const deleteStaff = async (req, res) => {
  try {
    let deleteStaff = await registrationDetails.findByIdAndDelete(req.params.id);

    if (deleteStaff) {
      console.log(deleteStaff);
      return res.status(200).send(deleteStaff);

    } else {
      return res.status(404).send({ "error": "Staff not found!" });
    }

  } catch (e) {
    res.status(500).send({ "error": "Something went wrong!" });
  }
}


// Update Staff
const updateStaff = async (req, res) => {
  try {
    let id = req.params.id;
    let updateStaff = await registrationDetails.findByIdAndUpdate({ _id: id }, req.body);
    if (updateStaff) {
      console.log(updateStaff);
      return res.status(200).send(updateStaff);
    } else {
      return res.status(404).send({ "error": "Staff not found!" });
    }

  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = {
  addStaff,
  getStaffDetails,
  deleteStaff,
  updateStaff
};