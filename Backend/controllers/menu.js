const Menu = require("../models/menu");
const multer = require("multer");
const fs = require("fs");
const { log } = require("console");

const postMenu = async (req, res) => {
  console.log(req.file);

  var menu = {
    item_name: req.body.item_name,
    item_type: req.body.item_type,
    price: req.body.price,
    description: req.body.description,
    image_url: req.file.filename,
  };
  const menu_data = await Menu.create(menu);
  console.log(menu_data);
  res.status(200).send({ menu });
};

const getAllMenu = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = parseInt(req.query.pageSize) || 6;
    const pipeline = [
      {
        $sort: {
          item_name: 1,
        },
      },
      {
        $skip: (pageNumber - 1) * pageSize,
      },
      {
        $limit: pageSize,
      },

      {
        $project: {
          _id: 1,
          item_name: 1,
          item_type: 1,
          price: 1,
          description: 1,
          image_url: 1,
          createdAt: 1,
          updatedAt: 1,
          createdBy: 1,
          updatedBy: 1,
        },
      },
    ];
    const all_menu_get = await Menu.aggregate(pipeline);
    return res.json(all_menu_get);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error" });
  }
};

const filter = async (req, res) => {
  try {
    Data = req.params.filter;
    console.log(Data);
    const filt = await Menu.find({
      item_type: Data,
    });
    console.log(filt);
    return res.send(filt);
  } catch (e) {
    res.status(404).send(e);
  }
};

const getMenu = async (req, res) => {
  try {
    let id = req.params.id;
    let menu_get = await Menu.findOne({ _id: id });
    console.log(menu_get);

    if (!menu_get) {
      return res.status(404).send();
    } else {
      res.send(menu_get);
    }
  } catch (e) {
    res.status(404).send(e);
  }
};

const updateMenu = async (req, res) => {
  try {
    let id = req.params.id;

    const record = await Menu.findByIdAndUpdate(id);

    record.item_name = req.body.item_name;
    record.item_type = req.body.item_type;
    record.price = req.body.price;
    record.description = req.body.description;
    if (req.file) {
      record.image_url = req.file.filename;
    }

    await record.save();
    res.status(200).json({
      status: 201,
      message: "Image updated successfully.",
      data: record,
    });
  } catch (e) {
    console.log("error: ", e);
    res.status(500).send({ message: "error" });
  }
};

const headerItem = async (req, res) => {
  try {
    const item = await Menu.find();

    return res.json(item);
  } catch (error) {
    return res.send(error);
  }
};

const deleteMenu = async (req, res) => {
  try {
    let menu_delete = await Menu.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(404).send();
    }

    console.log(menu_delete);
    return res.send(menu_delete);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  postMenu,
  getAllMenu,
  getMenu,
  updateMenu,
  deleteMenu,
  filter,
  headerItem,
};
