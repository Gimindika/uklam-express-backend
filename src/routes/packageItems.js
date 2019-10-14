const express = require("express");
const router = express.Router();
const multerUploads = require("../middleware/multer").multerUploads;
const packageItemsController = require("../controllers/packageItems");

router
  .get("/", packageItemsController.getPackageItems)
  .post("/", packageItemsController.addPackageItem)
  .put("/", packageItemsController.editPackageItem)
  .put("/photo",multerUploads, packageItemsController.editPhoto)
  .delete("/", packageItemsController.deletePackageItem);

module.exports = router;
