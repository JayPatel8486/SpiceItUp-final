const register = require("../models/regSchema");
const forgotPassword = require("../models/forgoPasswordSchema");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const cred = require('../constants/const')

const updatePassword = async (req, res) => {
  try {
    const { email, route } = req.body;
    const useremail = await register.findOne({ email: email });
    let otpCode = Math.floor(Math.random() * 300000);

    if (!useremail) {
      res.status(401).send("Wrong email");
    }

    const transport = nodemailer.createTransport({
      host: cred.NODEMAILER_HOST,
      auth: {
        user: cred.USER_EMAIL,
        pass: cred.USER_PASSWORD
      }
    });

    ejs.renderFile(path.resolve("./views/otp.ejs"), { name: useremail.first_name, otp: otpCode }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var mailOptions = {
          from: cred.USER_EMAIL,
          to: email,
          subject: "Reset Password",
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

    const otpType = route === cred.OTPTYPE.type1 ? cred.OTPTYPE.type1 : cred.OTPTYPE.type2
    const otpData = forgotPassword({
      email: email,
      otp: otpCode,
      expireIn: new Date().getTime() + 300000,
      otpType
    });
    let otpResponse = await otpData.save();

    if (route === cred.OTPTYPE.type1) {
      return otpResponse;
    }
    else {
      res.status(201).send(otpResponse)
    }

  } catch (err) {
    console.error("Error in updatePassword:", err);
    res.status(500).send("Internal server error");
  }
};

const checkotp = async (req, res) => {
  try {
    const { routeType, otp: { otp, email } } = req.body;
    let compareotp = await forgotPassword.findOne({ otp, otpType: routeType, email });
    if (!compareotp) {
      return res.status(401).send("not verified");
    }
    let currentdate = new Date().getTime();
    let diff = compareotp.expireIn - currentdate;
    if (diff <= 0) {
      return res.status(401).send("OTP expired");
    }
    if (routeType === cred.OTPTYPE.type1) {
      let result = compareotp.toObject();
      let token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "4h" });
      result.token = token
      return res.status(200).send(result);
    }
    return res.status(200).send(compareotp);
  } catch (error) {
    console.error("Error in checkotp:", error);
    return res.status(500).send("Internal server error");
  }
};

const changePassword = async (req, res) => {
  try {
    const password = req.body.password;
    const hashPassword = await bcrypt.hash(password, 12);
    const email = req.body.email;
    const finduser = await forgotPassword.findOne({ email: email });
    if (finduser) {
      const updated = await register.updateOne(
        { email },
        {
          $set: {
            password: hashPassword,
            loginCount: 0
          },
        }
      );
      res.status(200).send(updated);
    }
    else {
      res.status(404).send("User not found");
    }
    console.log("Password Updated");
  } catch (error) {
    res.status(500).send("user password has not reset...", error);
  }
};

module.exports = {
  updatePassword,
  checkotp,
  changePassword
};