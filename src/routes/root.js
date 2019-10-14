const express = require("express");
const router = express.Router();

const users = require("./users");
const guides = require("./guides");
const packageItems = require("./packageItems");
const packages = require('./packages');
const auth = require('./auth');

// const packagesRouter = require("./packages-routes");
// const categoryRouter = require("./category-routes");
// const transactionRouter = require("./transaction-routes");
// const adminRouter = require("./admin-routes");
// const reportRouter = require("./report-routes");

router.use('/', auth);
router.use("/user", users);
router.use("/guide", guides);
router.use("/packageitems", packageItems);
router.use('/packages', packages);
// router.use("/packages", packagesRouter);
// router.use("/category", categoryRouter);
// router.use("/transaction", transactionRouter);
// router.use("/admin", adminRouter);
// router.use("/report", reportRouter);

module.exports = router;
