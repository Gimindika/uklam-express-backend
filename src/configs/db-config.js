require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const mongoURI = process.env.DB_URI;
const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let conn;

db = {
  connect() {
    return new Promise((resolve, reject) => {
      client.connect(err => {
        if (err) return reject(err);

        conn = client.db("uklam");
        console.log("DB connected");
        resolve(conn);
      });
    });
  },
  getDB() {
    return conn;
  }
};

db.connect();
module.exports = db.getDB;
