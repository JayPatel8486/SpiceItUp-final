const Booking_model = require('../models/booking') //Import Table_Order Model
const Order_model = require('../models/order')//Import Order Model

//Get All Table Booking API
const getAllTableOrders = async (req, res) => {
  try {
    const tableOrder = await Booking_model.find().populate("userId")
    if (tableOrder.length === 0) {
      return res.status(200).json({
        message: "No bookings found",
        data: [],
      });
    }
    return res.status(200).json(tableOrder);
  } catch (err) {
    console.error("Error while fetching all table orders: ", err);
    return res.status(500).json(err);
  }
};


//Get Order for Table API
const getOrders = async (req, res) => {
  try {
    const booking_id = req.params.id;
    const tableOrder = await Order_model.find({ booking_id });
    if (!tableOrder) {
      return res.status(404).json({ error: 'Order By Id Not Found' });
    }
    return res.status(200).json(tableOrder);
  } catch (error) {
    console.error("Get Orders error:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


//Get all Booking For that particular Id
const getOrderByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const userbooking = await Booking_model.find({ userId }).populate("userId");

    if (!userbooking || userbooking.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    return res.status(200).json(userbooking);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    return res.status(500).json({ message: "Internal server error" });
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
      return res.status(404).json({ error: 'Booking not found' });
    }

    return res.status(200).json(tableOrder);
  } catch (err) {
    console.error("UpdateTableStatus error:", err);
    return res.status(500).json({ error: 'Internal server error' });
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
      return res.status(404).json({ error: 'Booking not found' });
    }

    return res.status(200).json(tableOrder);
  } catch (err) {
    console.error("Ordered update error:", err);
    return res.status(500).json({ error: 'Internal server error' });
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
      return res.status(404).json({ error: 'Booking not found' });
    }

    return res.status(200).json(tableOrder);
  } catch (err) {
    console.error("CancelTableOrder error:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//This is feedback Api posting the api through ID
const feedback = async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = req.body.feedback;

    const tableOrder = await Booking_model.findById(id);
    if (!tableOrder) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    tableOrder.feedback = feedback;
    tableOrder.updatedAt = new Date();
    tableOrder.updatedBy = "Customer";

    await tableOrder.save();

    return res.status(200).json(tableOrder);
  } catch (error) {
    console.error("Feedback error:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//Exports Module
module.exports = { getAllTableOrders, UpdateTableStatus, feedback, getOrderByUserId, CancelTableOrder, getOrders, Ordered }
