const register = require("../models/regSchema");
const forgotPassword = require("../models/forgoPasswordSchema");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

const updatePassword = async (req, res) => {
  try {
    const { email } = req.body;
    const useremail = await register.findOne({ email: email });
    if (useremail) {
      let otpCode = Math.floor(Math.random() * 300000);

      const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: "jaypatel127.jp49@gmail.com",
          pass: "tpkfivasxbsbebnb"
        }
      });


        ejs.renderFile(path.resolve("./views/otp.ejs"), { name:useremail.first_name, otp:otpCode } ,(err, data) => {
          if (err) {
            console.log(err);
          } else {
            var mailOptions = {
              from: "jaypatel127.jp49@gmail.com",
              to: req.body.email,
              subject: "Reset Password",
              html: data
            };
      ''
            transport.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
            });
          }
        });
      


      let otpData = forgotPassword({
        email: email,
        otp: otpCode,
        expireIn: new Date().getTime() + 300000,
      });

      let otpResponse = await otpData.save();
      res.status(201).send(otpResponse);
    } else {
      res.status(401).send("Wrong email");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};  

const checkotp = async (req, res) => {
  try {
    const otp = req.body.otp;
    const compareotp = await forgotPassword.findOne({ otp: otp });
    const email = req.body.email;
    const emailVerify = await forgotPassword.findOne({email:email});

    let currentdate = new Date().getTime();
    let diff = compareotp.expireIn - currentdate;
    console.log(diff);

    if (emailVerify.email === compareotp.email && diff > 0) {
      data = compareotp; 
      res.status(200).send(data);
    } else {
      res.status(401).send("not verified");
    }
  } catch (error) {
    console.log(error); 
    res.status(500).send("Internet server error")
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
    res.status(500).send("user password has not reset...",error);
  }
};

module.exports = {
  updatePassword,
  checkotp,
  changePassword
};