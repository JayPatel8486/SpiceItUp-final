const express = require('express');
const auth = require('../middleware/auth')
const controller = require('../controllers/fetch-controller.js');
const router = express.Router();

router.get('/api/table_orders', auth, controller.getAllTableOrders);// This Api is for Get all Current Order
router.get('/api/table_orders/orders/:id', auth, controller.getOrders); // This Api is for Get get order for Particular Table
router.put('/api/table_orders/:id/update_status', auth, controller.UpdateTableStatus); // This Api is for Update Table Status by Admin
router.put('/api/table_orders/feedback/:id', auth, controller.feedback); // This Api is for Posting Feedback for the Particular table
router.get('/api/table_orders/UserId/:id', auth, controller.getOrderByUserId); // This Api is for Get all Table Booked by cutomer
router.put('/api/table_orders/cancel/:id', auth, controller.CancelTableOrder); // This Api is for Cancelling Order
router.put('/api/table_orders/:id/update_status2', auth, controller.Ordered); // This Api is for Update Table Statuus=Ordered

module.exports = router;
