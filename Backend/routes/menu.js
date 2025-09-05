const express = require("express");
const auth = require('../middleware/auth')
const multer = require("multer");
const controller = require("../controllers/menu");
const router = express.Router();

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

router.get("/", auth, controller.getAllMenu);
router.get("/:filter", auth, controller.filter);
router.get("/:id", auth, controller.getMenu);
router.get("/item/menu", auth, controller.headerItem)
router.post("/", auth, upload, controller.postMenu);
router.put("/:id", upload, auth, controller.updateMenu);
router.delete("/:id", auth, controller.deleteMenu);

module.exports = router;
