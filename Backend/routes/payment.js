const express = require("express");

const auth = require('../middleware/auth')

const router = express.Router();

const controller = require('../controllers/payment')

router.post('/',auth, controller.paymentProcess);      

module.exports = router;