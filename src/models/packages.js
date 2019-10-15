const conn = require("../configs/db-config");

const packagesModel = {
  getAllPackages: () => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packages")
        .find()
        .toArray();

      resolve(result);
    });
  },
  getPackage: id => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packages")
        .find({ _id: id })
        .toArray();

      resolve(result);
    });
  },
  getPackageByType: type => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packages")
        .find({ type })
        .toArray();

      resolve(result);
    });
  },
  addPackage: data => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packages")
        .insertOne(data);

      resolve(result);
    });
  },
  editPackage: (id, data) => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packages")
        .updateOne({ _id: id }, { $set: data });

      resolve(result);
    });
  },
  editPhoto: (id, photo) => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packages")
        .updateOne({ _id: id }, { $set: { photo: photo } })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },
  deletePackage: id => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("packages")
        .findOneAndDelete({ _id: id });

      resolve(result);
    });
  }
};

module.exports = packagesModel;
