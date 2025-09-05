const express = require("express");
const auth = require('../middleware/auth');
const router = express.Router();
const controller = require('../controllers/staffManagement');

router.get('/', auth, controller.getStaffDetails);
router.post('/', auth, controller.addStaff);
router.delete('/:id', auth, controller.deleteStaff);
router.put('/:id', auth, controller.updateStaff);

module.exports = router;