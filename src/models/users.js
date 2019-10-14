const conn = require("../configs/db-config");

const usersModel = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("users")
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

  getUser: email => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("users")
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
        .collection("users")
        .updateOne({ email: email }, { $set: { balance: balance } })
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
        .collection("users")
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
        .collection("users")
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
        .collection("users")
        .updateOne({ email: email }, { $set: { password: password } })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  deleteUser: email => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("users")
        .removeOne({ email: email })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  }
};

module.exports = usersModel;
