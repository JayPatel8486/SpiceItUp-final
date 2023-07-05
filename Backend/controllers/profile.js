const register = require("../models/regSchema");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const getSpecificUser = async (req, res) => {
  try {
    console.log(req.params);
    // const userName = mongoose.model('userName',userSchema);
    const user = await register.findById({ _id: req.params.cid });
    console.log(user);
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    console.log("update data", req.body);
  const updatedata = req.body;
  console.log(new ObjectId(req.params.cid));
  // const user = await Registrationdetails.findByIdAndUpdate({ _id:req.params.cid }, {"first_name":req.body.firstName})
  // const user = await register.findByIdAndUpdate({ _id:new ObjectId(req.params.cid)}, req.body)
  const user = await register.findByIdAndUpdate(
    { _id: new ObjectId(req.params.cid) },
    req.body
  );
  console.log(user);
  if (user) {
    res.status(200).send(user);
  }
  } catch (error) {
    res.status(500).send(error);
  }
};
const updatePassword = async (req, res) => {
  try {
    const finduser = await register.findOne({ _id: req.params.cid });
    console.log("user", finduser);
    const oldpassword = req.body.password;

    const verifyuser = await bcrypt.compare(oldpassword, finduser.password);
    console.log(verifyuser);

    const newPassword = req.body.newPassword;
    const hashPassword = await bcrypt.hash(newPassword, 12);
    console.log(hashPassword);

    if (verifyuser) {
      const updated = await register.findByIdAndUpdate(
        { _id: finduser._id },
        { password: hashPassword }
      );
      res.send(updated);
    } else {
      res.status(400).send("password are not match !");
    }
  } catch (error) {
    console.log("error");
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log(req.params);
  const user = await register.findByIdAndDelete({ _id: req.params.cid });
  res.status(200).json({
    msg: "user deleted successfully",
  });
  } catch (error) {
    res.status(500).send(error);
  }
};

const addUser = async (req, res) => {
  try {
    console.log(req.body);
  const user = await register.create(req.body);
  console.log(user);
  res.status(200).json({
    user,
  });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getSpecificUser,
  updateUser,
  deleteUser,
  addUser,
  updatePassword,
};
