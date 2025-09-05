const Order = require("../models/order");
var ObjectId = require("mongodb").ObjectId;

const postOrder = async (req, res) => {
  try {
    const { booking_id, user_id, finalTotal, order_items } = req.body;
    const userIdObj = new ObjectId(user_id);
    const bookingIdObj = new ObjectId(booking_id);
    if (!booking_id || !user_id || !finalTotal || !order_items) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const result = await Order.find({
      user_id: userIdObj,
      booking_id: bookingIdObj,
    });
    console.log("result: ", result);
    const data = {
      booking_id,
      user_id,
      finalTotal,
      order_items
    };
    let order_add = await Order.create(data);
    res.status(200).send(order_add);
    console.log("order : ", order_add);
  } catch (err) {
    console.error("PostOrder error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const all_order_get = await Order.find();
    return res.send(all_order_get);
  } catch (err) {
    console.error("Error fetching all orders:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getOrderbyuserId = async (req, res) => {
  try {
    const user_id = req.params.id;
    const order_get = await Order.find({ user_id }).populate('user_id');
    console.log(order_get);
    if (!order_get) {
      return res.status(404).send("No orders found for this user");
    }
    return res.status(200).send(order_get);
  } catch (err) {
    console.error("Error fetching orders by userId:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order_update = await Order.findByIdAndUpdate({ _id: id }, req.body);
    if (!order_update) {
      return res.status(404).send("Order not found");
    }
    console.log(order_update);
    return res.status(200).send(order_update);
  } catch (err) {
    console.error("Error updating order:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order_delete = await Order.findByIdAndDelete(id);
    if (!order_delete) {
      return res.status(404).send("Order not found");
    }
    console.log(order_delete);
    return res.status(200).send(order_delete);
  } catch (err) {
    console.error("Error deleting order:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteOrderByItemId = async (req, res) => {
  try {
    const item_id = req.params.item_id;
    const order_delete = await Order.findByIdAndDelete(item_id);
    if (!order_delete) {
      return res.status(404).send("Order item not found");
    }
    console.log(order_delete);
    return res.status(200).send(order_delete);
  } catch (err) {
    console.error("Error deleting order by item_id:", err);
    return res.status(500).json({ error: "Internal server error" });
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
