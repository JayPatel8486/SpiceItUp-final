const registrationDetails = require("../models/regSchema");
const bcrypt = require("bcrypt");

const postRegister = async (req, res) => {
  try {
    const { password, confirm_password } = req.body;

    if (password !== confirm_password) {
      res.status(400).send({ message: "Password and confirm password is not matched" })
    }
    let customerReg_add = await registrationDetails({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      phone: req.body.phone,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12)
    });

    const registered = await customerReg_add.save();
    res.status(201).send(registered);
  } catch (e) {
    res.status(500).send(e);
  }
};

const getRegDetails = async (req, res) => {
  try {
    let all_customerReg_get = await registrationDetails.find({
      user_role: "customer",
    });
    console.log(all_customerReg_get);
    return res.status(200).send(all_customerReg_get);
  } catch (e) {
    res.status(500).send("Internet server error");
  }
};



module.exports = {
  postRegister,
  getRegDetails
};
