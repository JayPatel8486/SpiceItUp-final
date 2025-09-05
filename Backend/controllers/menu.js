const Menu = require("../models/menu");

const postMenu = async (req, res) => {
  try {
    const { filename } = req.file;
    const { item_name, item_type, price, description } = req.body;
    const menu = {
      item_name,
      item_type,
      price,
      description,
      image_url: filename,
    };
    const menu_data = await Menu.create(menu);
    console.log(menu_data);
    return res.status(200).send({ menu });
  } catch (err) {
    console.error("Error creating menu:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
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
    console.error("Error while fetching all menu items: ", error);
    return res.status(500).json({ error: "error" });
  }
};

const filter = async (req, res) => {
  try {
    const Data = req.params.filter;
    if (!Data) {
      return res.status(400).json({ error: "Filter parameter is required" });
    }
    const filt = await Menu.find({ item_type: Data });
    if (!filt || filt.length === 0) {
      return res.status(404).json({ message: "No menu items found for this filter" });
    }
    console.log(filt);
    return res.status(200).send(filt);
  } catch (err) {
    console.error("Filter error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getMenu = async (req, res) => {
  try {
    let id = req.params.id;
    let menuItems = await Menu.findOne({ _id: id });
    console.log(menuItems);

    if (!menuItems) {
      return res.status(404).send("No items found!");
    }
    return res.status(200).send(menuItems);

  } catch (err) {
    console.error("Error while fetching menu items: ", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const { item_name, item_type, price, description } = req.body;
    const { filename } = req.file;
    if (!id) {
      return res.status(400).json({ error: "Menu ID is required" });
    }
    const record = await Menu.findByIdAndUpdate(id);
    if (!record) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    record.item_name = item_name;
    record.item_type = item_type;
    record.price = price;
    record.description = description;
    if (req.file) {
      record.image_url = filename;
    }

    await record.save();
    return res.status(200).json({
      status: 201,
      message: "Image updated successfully.",
      data: record,
    });
  } catch (err) {
    console.error("UpdateMenu error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const headerItem = async (req, res) => {
  try {
    const item = await Menu.find();
    if (!item || item.length === 0) {
      return res.status(404).json({ message: "No menu items found" });
    }
    return res.status(200).json(item);
  } catch (err) {
    console.error("HeaderItem error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Menu ID is required" });
    }
    const menu_delete = await Menu.findByIdAndDelete(id);
    if (!menu_delete) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    return res.status(200).send(menu_delete);
  } catch (err) {
    console.error("DeleteMenu error:", err);
    return res.status(500).json({ error: "Internal server error" });
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
