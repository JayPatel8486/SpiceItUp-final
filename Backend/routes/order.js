const express = require('express');
const auth = require('../middleware/auth')
const controller = require('../controllers/order');
const orouter = express.Router();

orouter.get('/', auth, controller.getAllOrder);
orouter.get('/:id', auth, controller.getOrderbyuserId);
orouter.post('/', auth, controller.postOrder);
orouter.put('/:id', auth, controller.updateOrder);
orouter.delete('/:id', auth, controller.deleteOrder);
orouter.delete('/:id', auth, controller.deleteOrderByItemId)

module.exports = orouter;