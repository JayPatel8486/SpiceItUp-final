const express = require("express");

const profileRoutes = express.Router();
const controllers = require('../controllers/profile');
const auth = require('../middleware/auth')


// router.get('/:id', controllers.getCustomerDetail); 
profileRoutes.get("/:cid",auth,controllers.getSpecificUser);
profileRoutes.put("/:cid",auth,controllers.updateUser);
profileRoutes.put("/update/:cid",auth,controllers.updatePassword);
profileRoutes.delete("/:cid",auth,controllers.deleteUser);
profileRoutes.post("/:cid",auth,controllers.addUser);



module.exports = profileRoutes;  