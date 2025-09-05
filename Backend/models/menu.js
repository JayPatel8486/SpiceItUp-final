const { Schema, model } = require("mongoose");

const menuSchema = Schema([
  {
    item_name: {
      type: String,
      unique: true,
    },
    price: {
      type: Number,
    },
    item_type: {
      type: String,
    },
    image_url: {
      type: String
    },
    description: {
      type: String,
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
      default: 'user'
    },
    updatedBy: {
      type: String,
      default: 'user'
    },
  },
]);

// menu collection
const Menu_model = new model("Menu", menuSchema);
module.exports = Menu_model;
