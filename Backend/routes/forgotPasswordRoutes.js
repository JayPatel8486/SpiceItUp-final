const express = require("express");
const controller = require('../controllers/forgotPassword')
const router = express.Router();

router.post('/', controller.updatePassword);
router.post('/checkOtp', controller.checkotp);
router.patch('/change-password', controller.changePassword);

module.exports = router;   