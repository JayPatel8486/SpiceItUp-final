const Booking_model = require('../models/booking') //Import Table_Order Model
const Order_model=require('../models/order')//Import Order Model

//Get All Table Booking API
const getAllTableOrders = async (req, res) => {
  try {
    const tableOrder = await Booking_model.find().populate("userId")
    res.status(200).json(tableOrder);
  } catch (err) {
    res.status(500).json(err);
  }
}; 


//Get Order for Table API
const getOrders = async (req, res) => {
  const booking_id=req.params.id;
  const tableOrder = await Order_model.find({booking_id});
    if (!tableOrder) {
      res.status(404).json({ error: 'Order By Id Not Found' });
    }
    else{
    res.status(200).json(tableOrder);
  }
};


//Get all Booking For that particular Id
const getOrderByUserId = async (req, res) => {
  const userId = req.params.id;
  const userbooking = await Booking_model.find({ userId }).populate("userId")
  if (userbooking) {
    res.status(200).json(userbooking);

  } else {
    res.status(500).json({ message: "there was erroe while fetching the data" });
  }
};


//Update Status through Id
const UpdateTableStatus = async (req, res) => {
  try {
    const tableOrder = await Booking_model.findByIdAndUpdate(
      req.params.id,
      { status: 'Completed' },
      { new: true }
    );
    if (!tableOrder) {
      res.status(404).json({ error: 'Table Not Found' });
    }
    res.status(200).json(tableOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Update Status=Ordered through Id
const Ordered = async (req, res) => {
  try {
    const tableOrder = await Booking_model.findByIdAndUpdate(
      req.params.id,
      { status: 'Ordered' },
      { new: true }
    );
    if (!tableOrder) {
      res.status(404).json({ error: 'Table Not Found' });
    }
    res.status(200).json(tableOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Cancel Order through ID
const CancelTableOrder = async (req, res) => {
  try {
    const tableOrder = await Booking_model.findByIdAndUpdate(
      req.params.id,
      { status: 'Cancelled' },
      { new: true }
    );
    if (!tableOrder) {
      res.status(404).json({ error: 'Table Not Found' });
    }
    res.status(200).json(tableOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//This is feedback Api posting the api through ID
const feedback = async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = req.body.feedback;
    const tableOrder = await Booking_model.findByIdAndUpdate(id)
    if (!tableOrder) {
      res.status(404).json({ error: 'Table Not Found' });
    }
    tableOrder.feedback = feedback, { new: true };
    tableOrder.updatedAt = new Date();
    tableOrder.updatedBy = "Customer"
    tableOrder.save();
    res.status(200).json(tableOrder);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//Exports Module
module.exports = { getAllTableOrders, UpdateTableStatus, feedback, getOrderByUserId, CancelTableOrder,getOrders,Ordered }
