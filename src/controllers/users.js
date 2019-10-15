const usersModel = require("../models/users");
// const packagesModel = require("../models/packages");
const formResponse = require("../helpers/form-response");
const cloudinary = require("../configs/cloudinaryConfig");
const crypto = require("crypto-js");

const hash = string => {
  return crypto.SHA256(string).toString(crypto.enc.Hex);
};

const usersController = {
  getUsers: (req, res) => {
    const email = req.query.email;
    if (email) {
      usersModel
        .getUser(email)
        .then(result => {
          if (result.length) {
            formResponse.success(res, 200, result[0]);
          } else {
            const empty = {
              empty: "No data."
            };
            formResponse.success(res, 200, empty);
          }
        })
        .catch(error => {
          res.json(error);
        });
    } else {
      usersModel
        .getAllUsers()
        .then(result => {
          formResponse.success(res, 200, result);
        })
        .catch(error => {
          res.json(error);
        });
    }
  },
  //////////////////////////////////////////////////////////////////
  topUp: async (req, res) => {
    const email = req.query.email;
    const amount = req.body.amount;

    const user = await usersModel
      .getUser(email)
      .then(result => {
        return result[0];
      })
      .catch(error => {
        res.json(error);
      });

    const balance = parseInt(user.balance) + parseInt(amount);

    try {
      usersModel.setBalance(email, balance);

      const data = {
        email,
        balance
      };
      formResponse.success(res, 200, data);
    } catch (error) {
      res.json(error);
    }
  },
  //////////////////////////////////////////////////////////////////
  editProfile: async (req, res) => {
    const email = req.query.email;
    const body = req.body;

    let data = {};

    const user = await usersModel
      .getUser(email)
      .then(result => {
        return result[0];
      })
      .catch(error => {
        res.json(error);
      });

    if (!user) {
      errorMessagee = {
        error: "User not found!"
      };
      formResponse.success(res, 200, errorMessagee);
    }

    data = {
      ...user.profile
    };

    for (key in body) {
      if (body.hasOwnProperty(key)) {
        // console.log(key + " = " + body[key]);
        data = {
          ...data,
          [key]: body[key]
        };
      }
    }

    usersModel
      .editProfile(email, data)
      .then(result => {
        data = {
          email: email,
          profile: { ...data }
        };
        formResponse.success(res, 200, data);
      })
      .catch(error => {
        res.json(error);
      });
  },
  //////////////////////////////////////////////////////////////////
  editPhoto: async (req, res) => {
    const email = req.query.email;
    let photo = "";

    if (req.file) {
      photo = await cloudinary.uploader.upload(req.file.path, function(
        err,
        result
      ) {
        return result;
      });
    }
    const data = {
      email,
      photo: photo.url
    };
    await usersModel
      .editPhoto(email, photo.url)
      .then(result => {
        formResponse.success(res, 200, data);
      })
      .catch(error => {
        res.json(error);
      });
  },
  //////////////////////////////////////////////////////////////////
  changePassword: async (req, res) => {
    const email = req.query.email;
    const currentPassword = hash(req.body.currentPassword);
    const newPassword = hash(req.body.newPassword);

    const user = await usersModel
      .getUser(email)
      .then(result => {
        return result[0];
      })
      .catch(error => {
        res.json(error);
      });

    if (!user) {
      errorMessagee = {
        error: "User not found!"
      };
      formResponse.success(res, 200, errorMessagee);
    }

    if (user.password != currentPassword) {
      const errorMessagee = {
        error: "Wrong Password!"
      };
      formResponse.success(res, 200, errorMessagee);
    } else {
      usersModel
        .setPassword(email, newPassword)
        .then(result => {
          data = {
            success: "Password changed"
          };
          formResponse.success(res, 200, data);
        })
        .catch(error => {
          res.json(error);
        });
    }
  },

  //////////////////////////////////////////////////////////////////
  deleteUser: async (req, res) => {
    const email = req.query.email;

    usersModel
      .deleteUser(email)
      .then(result => {
        data = {
          email
        };
        formResponse.success(res, 200, data);
      })
      .catch(error => {
        res.json(error);
      });
  },
  
};

module.exports = usersController;
