const Order = require("../models/order");
const { loginCheck } = require("./login");
const Booking_model = require("../models/booking");
var ObjectId = require("mongodb").ObjectId;


const postOrder = async (req, res) => {
  try {
    console.log("hit........................", req.body);

    const data = {
      booking_id: req.body.booking_id,
      user_id: req.body.user_id,
      finalTotal: req.body.finalTotal,
      order_items: req.body.order_items,
    };

    const user_id = new ObjectId(req.body.user_id);
    const booking_id = new ObjectId(req.body.booking_id);
    console.log("idd", user_id);
    console.log("id", booking_id);
    const result = await Order.find({
      user_id: user_id,
      booking_id: booking_id,
    });
    console.log("result", result);
    let order_add = await Order.create(data);
    res.status(200).send(order_add);
    console.log("order : ", order_add);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllOrder = async (req, res) => {
  try {
    let all_order_get = await Order.find();
    console.log(all_order_get);
    return res.send(all_order_get);
  } catch (e) {
    res.status(404).send("err");
  }
};

const getOrderbyuserId = async (req, res) => {
  try {
    let user_id = req.params.id;
    let order_get = await Order.find({ user_id }).populate('user_id');
    console.log(order_get);
    if (!order_get) {
      return res.status(404).send();
    } else {
      res.send(order_get);
    }
  } catch (e) {
    res.status(404).send(e);
  }
};

const updateOrder = async (req, res) => {
  try {
    let id = req.params.id;
    let order_update = await Order.findByIdAndUpdate({ _id: id }, req.body);
    if (!order_update) {
      return res.status(404).send("Not update");
    }
    console.log(order_update);
    return res.send(order_update);
  } catch (e) {
    res.status(500).send(e);
  }
};

const deleteOrder = async (req, res) => {
  try {
    let order_delete = await Order.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(404).send();
    }
    console.log(order_delete);
    return res.send(order_delete);
  } catch (e) {
    res.status(500).send(e);
  }
};

const deleteOrderByItemId = async (req, res) => {
  try {
    let order_delete = await Order.findByIdAndDelete(req.params.item_id);
    if (!req.params.item_id) {
      return res.status(404).send();
    }
    console.log(order_delete);
    return res.send(order_delete);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  postOrder,
  getAllOrder,
  getOrderbyuserId,
  updateOrder,
  deleteOrder,
  deleteOrderByItemId,
};
