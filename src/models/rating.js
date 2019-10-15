const conn = require("../configs/db-config");

const ratingModal = {
  getRatingNumber: guide => {
    return new Promise(async (resolve, reject) => {
      tmp = await conn()
        .collection("rating")
        .find({ guide })
        .toArray();

      let result = [];
      tmp.map(rating => {
        result.push(rating.rating);
      });
      resolve(result);
    });
  },

  getRating: guide => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("rating")
        .find({ guide })
        .toArray()
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  addRating: data => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("rating")
        .insertOne(data)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  }
};

module.exports = ratingModal;
