const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth')

const {Ordered,getAllTableOrders,UpdateTableStatus,getOrders,feedback,getOrderByUserId,CancelTableOrder}=require('../controllers/fetch-controller.js'); //Importing all Api in Router

router.get('/api/table_orders',auth,getAllTableOrders);// This Api is for Get all Current Order
router.get('/api/table_orders/orders/:id',auth,getOrders); // This Api is for Get get order for Particular Table
router.put('/api/table_orders/:id/update_status',auth,UpdateTableStatus); // This Api is for Update Table Status by Admin
router.put('/api/table_orders/feedback/:id',auth,feedback); // This Api is for Posting Feedback for the Particular table
router.get('/api/table_orders/UserId/:id',auth,getOrderByUserId); // This Api is for Get all Table Booked by cutomer
router.put('/api/table_orders/cancel/:id',auth,CancelTableOrder); // This Api is for Cancelling Order
router.put('/api/table_orders/:id/update_status2',auth,Ordered); // This Api is for Update Table Statuus=Ordered

module.exports=router;
