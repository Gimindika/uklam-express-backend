const conn = require("../configs/db-config");

const uklamBankModel = {
  setUklamBalance: (id,balance) => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("uklambank")
        .updateOne({_id:id},{ $set: { balance: balance } })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  getCurrentBalance: () => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("uklambank")
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

  setUserCurrentOrder: (email, data) => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("users")
        .updateOne({ email: email }, { $set: { currentOrder: data } })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  getOrderListByGuide: email => {
    
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("orderlist")
        .find({ "package.guide": email })
        .toArray()
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  addOrderList: data => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("orderlist")
        .insertOne(data)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  deleteOrderList: id => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("orderlist")
        .findOneAndDelete({ _id: id });

      resolve(result);
    });
  },

  getOrder: id => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("orderlist")
        .find({ _id: id })
        .toArray();

      resolve(result);
    });
  },

  setOrderStatus: (id, status) => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("orderlist")
        .updateOne({ _id: id }, { $set: { status: status } })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  setUserOrderStatus: (email, status) => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("users")
        .updateOne({ email: email }, { $set: { "currentOrder.status": status } })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  saveOrderRecord: data => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("transactions")
        .insertOne(data)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },
  updateOrderRecord: (id, data) => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("transactions")
        .updateOne({ _id: id }, { $set: data})
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  },

  getTransactionHistory: user => {
    return new Promise((resolve, reject) => {
      result = conn()
        .collection("transactions")
        .find({ user: user })
        .toArray();

      resolve(result);
    });
  },
};

module.exports = uklamBankModel;
