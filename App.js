const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("morgan");
const router = require("./src/routes/root");
const firebase = require('firebase');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());
app.use(helmet({ xssFilter: true }));

////////////////////////////////////////////////////
//firebas config
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDM8nTOKmeyfjwxlXvoppVAdApnzwYtjcY",
    authDomain: "uklam-6440c.firebaseapp.com",
    databaseURL: "https://uklam-6440c.firebaseio.com",
    projectId: "uklam-6440c",
    storageBucket: "uklam-6440c.appspot.com",
    messagingSenderId: "545117624595",
    appId: "1:545117624595:web:2df7320727142a1237a2e6",
    measurementId: "G-MW4HNPL8CE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// console.log(firebase.database().ref("order/"));

////////////////////////////////////////////////////

app.use("/api", router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
