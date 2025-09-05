const express = require("express");
const controller = require('../controllers/login');
const router = express.Router();

router.post('/', controller.login);
module.exports = router;  