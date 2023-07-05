
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema([
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "registrationDetails",
    },
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "table_orders",
    },

    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "menus",
    },
    order_items: [
      {
        quantity: {
          type: Number,
        },
        description: {
          type: String,
        },
        image_url: {
          type: String,
        },
        total: {
          type: Number,
        },
        item_name: {
          type: String,
        },
        item_type: {
          type: String,
        },
        price: {
          type: Number,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
        updatedAt: {
          type: Date,
          default: Date.now(),
        },
        createdBy: {
          type: String,
          default: "user",
        },
        updateBy: {
          type: String,
          default: "user",
        },
      },
    ],
    finalTotal:{
      type: Number,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    createdBy: {
      type: String,
      default: "user",
    },
    updateBy: {
      type: String,
      default: "user",
    },
  },
]);

//collections

const Order_model = new mongoose.model("Order", orderSchema);

module.exports = Order_model;
