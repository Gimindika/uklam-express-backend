const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const multerUploads = require("../middleware/multer").multerUploads;

router.get("/", usersController.getUsers);

router.post("/topup", usersController.topUp);

router.put("/profile", usersController.editProfile);
router.put("/photo", multerUploads, usersController.editPhoto);
router.put("/password", usersController.changePassword);

router.delete("/", usersController.deleteUser);

module.exports = router;
