const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const orderController = require('../controllers/order');
const multerUploads = require("../middleware/multer").multerUploads;

router.get("/", usersController.getUsers);
router.get('/history', orderController.getTransactionHistory);
router.post("/topup", usersController.topUp);
router.post('/order', orderController.createOrder);
router.put("/profile", usersController.editProfile);
router.put("/photo", multerUploads, usersController.editPhoto);
router.put("/password", usersController.changePassword);
router.delete("/", usersController.deleteUser);

module.exports = router;
