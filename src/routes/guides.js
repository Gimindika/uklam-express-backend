const express = require("express");
const router = express.Router();
const guidesController = require("../controllers/guides");
const multerUploads = require("../middleware/multer").multerUploads;

router.get("/", guidesController.getGuides);

router.put("/profile", guidesController.editProfile);
router.put("/photo", multerUploads, guidesController.editPhoto);
router.put("/password", guidesController.changePassword);
router.put("/location", guidesController.setLocation);


router.delete("/", guidesController.deleteGuide);

module.exports = router;
