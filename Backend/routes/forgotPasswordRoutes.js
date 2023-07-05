const express = require("express");

const router = express.Router();

const controller = require('../controllers/forgotPassword')

router.post('/', controller.updatePassword); 

router.post('/checkOtp',controller.checkotp);

router.patch('/change-password',controller.changePassword);

module.exports = router;   