const conn = require("../configs/db-config");

const guidesModel = {
  getAllGuides: () => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("guides")
        .find()
        .toArray()
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  getGuide: email => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("guides")
        .find({ email: email })
        .toArray()
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  setBalance: (email, balance) => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("guides")
        .updateOne({ email: email }, { $set: { balance: balance } })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  setLocation: (email, location) => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("guides")
        .updateOne({ email: email }, { $set: { location: location } })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  editProfile: (email, data) => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("guides")
        .updateOne({ email: email }, { $set: { profile: data } })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  editPhoto: (email, photo) => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("guides")
        .updateOne({ email: email }, { $set: { photo: photo } })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  setPassword: (email, password) => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("guides")
        .updateOne({ email: email }, { $set: { password: password } })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  setRating: (email, rating) => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("guides")
        .updateOne({ email: email }, { $set: { rating: rating } })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  deleteGuide: email => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("guides")
        .removeOne({ email: email })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  register: data => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("guides")
        .insertOne(data);

      resolve(result);
    });
  }
};

module.exports = guidesModel;
