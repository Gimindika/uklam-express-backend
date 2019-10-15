const express = require("express");
const router = express.Router();
const guidesController = require("../controllers/guides");
const ratingController = require('../controllers/rating');
const orderController = require('../controllers/order');
const multerUploads = require("../middleware/multer").multerUploads;

router.get("/", guidesController.getGuides);
router.get('/rating', ratingController.getRating);
router.post('/order', orderController.responseOrder);
router.post('/rating', ratingController.addRating);
router.put("/profile", guidesController.editProfile);
router.put("/photo", multerUploads, guidesController.editPhoto);
router.put("/password", guidesController.changePassword);
router.put("/location", guidesController.setLocation);
router.put('/status', guidesController.setStatus);
router.delete("/", guidesController.deleteGuide);

module.exports = router;
