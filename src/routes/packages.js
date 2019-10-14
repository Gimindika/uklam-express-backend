const express = require("express");
const router = express.Router();
const multerUploads = require("../middleware/multer").multerUploads;
const packagesController = require("../controllers/packages");

router
  .get("/", packagesController.getPackages)
  .post("/", packagesController.addPackage)
  .put("/", packagesController.editPackage)
  .put("/photo",multerUploads, packagesController.editPhoto)
  .delete("/", packagesController.deletePackage);

module.exports = router;
