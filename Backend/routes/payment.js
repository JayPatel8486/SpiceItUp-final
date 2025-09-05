const express = require("express");
const auth = require('../middleware/auth')
const controller = require('../controllers/payment')
const router = express.Router();

router.post('/', auth, controller.paymentProcess);

module.exports = router;