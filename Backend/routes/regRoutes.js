const express = require("express");
const controller = require('../controllers/registration')
const router = express.Router()

router.post('/', controller.postRegister);
router.get('/getRegDetails', controller.getRegDetails);

module.exports = router;