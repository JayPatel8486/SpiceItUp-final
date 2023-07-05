const express = require('express');

const orouter = express.Router();

const controller = require('../controllers/order');

const auth = require('../middleware/auth')

orouter.post('/', auth,controller.postOrder);

orouter.get('/',auth, controller.getAllOrder);

orouter.get('/:id', auth,controller.getOrderbyuserId);

orouter.put('/:id',auth, controller.updateOrder);

orouter.delete('/:id',auth, controller.deleteOrder);

orouter.delete('/:id', auth,controller.deleteOrderByItemId)

module.exports = orouter;

