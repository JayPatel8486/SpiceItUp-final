const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

const controller = require('../controllers/staffManagement');

router.post('/',auth, controller.addStaff);

router.get('/',auth, controller.getStaffDetails);

router.delete('/:id',auth, controller.deleteStaff);

router.put('/:id',auth, controller.updateStaff);

module.exports = router;