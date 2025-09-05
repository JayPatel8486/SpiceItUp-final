const express = require("express");
const auth = require('../middleware/auth')
const profileRoutes = express.Router();
const controllers = require('../controllers/profile');

// router.get('/:id', controllers.getCustomerDetail); 
profileRoutes.get("/:cid", auth, controllers.getSpecificUser);
profileRoutes.put("/:cid", auth, controllers.updateUser);
profileRoutes.put("/update/:cid", auth, controllers.updatePassword);
profileRoutes.delete("/:cid", auth, controllers.deleteUser);
profileRoutes.post("/:cid", auth, controllers.addUser);

module.exports = profileRoutes;  