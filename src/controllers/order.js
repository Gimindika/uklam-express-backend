const usersModel = require("../models/users");
const packagesModel = require("../models/packages");
const orderModel = require("../models/order");
const guideModel = require("../models/guides");
const formResponse = require("../helpers/form-response");
const firebase = require("firebase");
let ObjectId = require("mongodb").ObjectID;

const orderController = {
  //////////////////////////////////////////////////////////////////
  createOrder: async (req, res) => {
    let packageID = req.body.package;
    packageID = new ObjectId(packageID);
    const orderDate = req.body.orderDate;
    const status = "pending";

    const user = await usersModel
      .getUser(req.query.email)
      .then(result => {
        return result[0];
      })
      .catch(error => {
        res.json(error);
      });

    const package = await packagesModel
      .getPackage(packageID)
      .then(result => {
        return result[0];
      })
      .catch(error => {
        res.json(error);
      });

    if (user.balance < package.price) {
      formResponse.success(res, 200, { error: "Insufficient balance" });
    } else {
      const data = {
        user: user.email,
        package,
        orderDate,
        status
        // guide:package.guide
      };

      //payment dummy
      //reduce user's balance
      ///////////////////////////////////
      usersModel
        .setBalance(
          user.email,
          parseInt(user.balance) - parseInt(package.price)
        )
        .then(result => {
          return null;
        })
        .catch(error => {
          res.json(error);
        });

      //add Uklam's balance
      const currentBalance = await orderModel
        .getCurrentBalance()
        .then(result => {
          return result[0].balance;
        })
        .catch(error => {
          res.json(error);
        });

      orderModel
        .setUklamBalance(
          new ObjectId("5da568ac122c541214ef32db"),
          parseInt(currentBalance) + parseInt(package.price)
        )
        .then(result => {
          return null;
        })
        .catch(error => {
          res.json(error);
        });
      ///////////////////////////////////

      orderModel
        .setUserCurrentOrder(user.email, data)
        .then(result => {
          //add order to guide orderlist
          ///////////////////////////////////////////
          orderModel
            .addOrderList(data)
            .then(result => {
              const firebaseData = {
                ...data,
                _id: data._id.toString()
              };

              firebase
                .database()
                .ref("order/" + data._id.toString())
                .set(firebaseData);
              //////////////////////////////////////////////
              formResponse.success(res, 200, data);
            })
            .catch(error => {
              res.json(error);
            });
        })
        .catch(error => {
          res.json(error);
        });
    }
  },

  //////////////////////////////////////////////////////////////////
  responseOrder: async (req, res) => {
    const response = req.body.response;
    const orderId = new ObjectId(req.body.order);
    let order = await orderModel
      .getOrder(orderId)
      .then(result => {
        return result[0];
      })
      .catch(error => {
        res.json(error);
      });

    const guideEmail = order.package.guide;
    const userEmail = order.user;

    if (response == "accept") {
      //order accepted
      //set guide status
      guideModel
        .setStatus(guideEmail, "unavailable")
        .then(result => {
          return null;
        })
        .catch(error => {
          res.json(error);
        });
      //set order status(in order list and in users)
      orderModel
        .setOrderStatus(orderId, "ongoing")
        .then(result => {
          return null;
        })
        .catch(error => {
          res.json(error);
        });

      orderModel
        .setUserOrderStatus(userEmail, "ongoing")
        .then(result => {
          return null;
        })
        .catch(error => {
          res.json(error);
        });

      //save record in transaction history
      order = {
        ...order,
        status: "ongoing"
      };
      orderModel
        .saveOrderRecord(order)
        .then(result => {
          /////////////////////////////////////////////
          const firebaseData = {
            ...order,
            _id: order._id.toString()
          };

          firebase
            .database()
            .ref("order/" + order._id.toString())
            .set(firebaseData);
          /////////////////////////////////////////////
          formResponse.success(res, 200, order);
        })
        .catch(error => {
          res.json(error);
        });
    } else {
      //order rejected
      const package = order.package;

      //set order status(in order list and in users)
      orderModel
        .setOrderStatus(orderId, "rejected")
        .then(result => {
          return null;
        })
        .catch(error => {
          res.json(error);
        });

      orderModel
        .setUserOrderStatus(userEmail, "rejected")
        .then(result => {
          return null;
        })
        .catch(error => {
          res.json(error);
        });

      //remove the order from guide's order list
      orderModel
        .deleteOrderList(orderId)
        .then(result => {
          return null;
        })
        .catch(error => {
          res.json(error);
        });

      //save record in transaction history
      order = {
        ...order,
        status: "rejected"
      };
      orderModel
        .saveOrderRecord(order)
        .then(result => {
          /////////////////////////////////////////////
          const firebaseData = {
            ...order,
            _id: order._id.toString()
          };

          firebase
            .database()
            .ref("order/" + order._id.toString())
            .set(firebaseData);
          /////////////////////////////////////////////
          formResponse.success(res, 200, order);
        })
        .catch(error => {
          res.json(error);
        });

      //refund to user
      ///////////////////////////////////
      const user = await usersModel
        .getUser(order.user)
        .then(result => {
          return result[0];
        })
        .catch(error => {
          res.json(error);
        });

      //trf from Uklam's balance
      const currentBalance = await orderModel
        .getCurrentBalance()
        .then(result => {
          return result[0].balance;
        })
        .catch(error => {
          res.json(error);
        });

      orderModel
        .setUklamBalance(
          new ObjectId("5da568ac122c541214ef32db"),
          parseInt(currentBalance) - parseInt(package.price)
        )
        .then(result => {
          return null;
        })
        .catch(error => {
          res.json(error);
        });

      usersModel
        .setBalance(
          user.email,
          parseInt(user.balance) + parseInt(package.price)
        )
        .then(result => {
          return null;
        })
        .catch(error => {
          res.json(error);
        });

      ///////////////////////////////////
    }
  },

  getOrderListByGuide: (req, res) => {
    const guide = req.query.email;

    orderModel
      .getOrderListByGuide(guide)
      .then(result => {
        formResponse.success(res, 200, result);
      })
      .catch(error => {
        res.json(error);
      });
  },

  getTransactionHistory: (req, res) => {
    const user = req.query.email;

    orderModel
      .getTransactionHistory(user)
      .then(result => {
        formResponse.success(res, 200, result);
      })
      .catch(error => {
        res.json(error);
      });
  },

  finishOrder: async (req, res) => {
    const orderId = new ObjectId(req.body.order);
    let order = await orderModel
      .getOrder(orderId)
      .then(result => {
        return result[0];
      })
      .catch(error => {
        res.json(error);
      });

    const guideEmail = order.package.guide;
    const userEmail = order.user;

    //set order status(in order list and in users)
    orderModel
      .setOrderStatus(orderId, "finished")
      .then(result => {
        return null;
      })
      .catch(error => {
        res.json(error);
      });

    orderModel
      .setUserOrderStatus(userEmail, "finished")
      .then(result => {
        return null;
      })
      .catch(error => {
        res.json(error);
      });

    //remove the order from guide's order list
    orderModel
      .deleteOrderList(orderId)
      .then(result => {
        return null;
      })
      .catch(error => {
        res.json(error);
      });

    //set timeout, send money from uklam's acc to guide's w/ 5% admin charge
    const amount = order.package.price * 0.95;
    ///////////////////////////////////
    const guide = await guideModel
      .getGuide(guideEmail)
      .then(result => {
        return result[0];
      })
      .catch(error => {
        res.json(error);
      });

    //trf from Uklam's balance
    const currentBalance = await orderModel
      .getCurrentBalance()
      .then(result => {
        return result[0].balance;
      })
      .catch(error => {
        res.json(error);
      });

    orderModel
      .setUklamBalance(
        new ObjectId("5da568ac122c541214ef32db"),
        parseInt(currentBalance) - parseInt(amount)
      )
      .then(result => {
        return null;
      })
      .catch(error => {
        res.json(error);
      });

    guideModel
      .setBalance(guideEmail, parseInt(guide.balance) + parseInt(amount))
      .then(result => {
        return null;
      })
      .catch(error => {
        res.json(error);
      });

    /////////////////////////////////////////////////////

    //set guide status to available
    guideModel
      .setStatus(guideEmail, "available")
      .then(result => {
        return null;
      })
      .catch(error => {
        res.json(error);
      });

    //update record in transaction history
    order = {
      ...order,
      status: "finished"
    };
    orderModel
      .updateOrderRecord(orderId, order)
      .then(result => {
        /////////////////////////////////////////////
        const firebaseData = {
          ...order,
          _id: order._id.toString()
        };

        firebase
          .database()
          .ref("order/" + order._id.toString())
          .set(firebaseData);
        /////////////////////////////////////////////
        formResponse.success(res, 200, order);
      })
      .catch(error => {
        res.json(error);
      });
  }
};

module.exports = orderController;
