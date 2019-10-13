const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("morgan");
const router = require("./src/routes/root");
// const db = require("./src/configs/db-config");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());
app.use(helmet({ xssFilter: true }));

app.use("/api", router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
