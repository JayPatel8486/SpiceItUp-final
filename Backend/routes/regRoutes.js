const express = require("express");

const router = express.Router();


const controller = require('../controllers/registration')

router.post('/', controller.postRegister);      

router.get('/getRegDetails', controller.getRegDetails);

// router.get('/:id', controller.getCustomerDetail);

module.exports = router;