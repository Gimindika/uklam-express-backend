const express = require("express");
const router = express.Router();

const packageItemsController = require("../controllers/packageItems");

router
  .get("/", packageItemsController.getPackageItems)
  .post("/", packageItemsController.addPackageItem)
  // .put("/:id", packageItemsController.editPackageItem)
  .put("/photo", packageItemsController.editPhoto)

  .delete("/", packageItemsController.deletePackageItem);

module.exports = router;
