const express = require("express");
const auth = require('../middleware/auth')
const controller = require('../controllers/booking');
const router = express.Router();

router.post('/', auth, controller.addBookingDetails);
router.get('/checkAvailableTables', auth, controller.checkAvailableBooking);
router.get('/all', auth, controller.getBookingDetails);

module.exports = router; 