const express = require("express");
const auth = require('../middleware/auth')


const router = express.Router();

const controller = require("../controllers/menu");
const multer = require("multer");
const path = require("path");


const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "img/");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".png");
    },
  }),
}).single("image");


router.post("/", auth,upload, controller.postMenu);

router.get("/", auth,controller.getAllMenu);

router.get("/:filter", auth, controller.filter);

router.get("/:id",auth, controller.getMenu);

router.put("/:id",upload,auth, controller.updateMenu);

router.delete("/:id",auth, controller.deleteMenu);

router.get("/item/menu", auth, controller.headerItem)

module.exports = router;
