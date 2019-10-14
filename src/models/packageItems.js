const conn = require("../configs/db-config");

const packageItemsModels = {
  getAllPackageItems: () => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packageitems")
        .find()
        .toArray();

      resolve(result);
    });
  },
  getPackageItem: id => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packageitems")
        .find({ _id:id})
        .toArray();

      resolve(result);
    });
  },
  addPackageItem: data => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packageitems")
        .insertOne(data);

      resolve(result);
    });
  },
  editPackageItem: (id, data) => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packageitems")
        .updateOne({ _id:id}, { $set: data });

      resolve(result);
    });
  },
  editPhoto: (id, photo) => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packageitems")
        .updateOne({ _id:id}, { $set: { photo: photo } })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },
  deletePackageItem: id => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packageitems")
        .findOneAndDelete({ _id:id});

      resolve(result);
    });
  }
};

module.exports = packageItemsModels;
