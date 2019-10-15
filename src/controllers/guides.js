const guidesModel = require("../models/guides");
const formResponse = require("../helpers/form-response");
const cloudinary = require("../configs/cloudinaryConfig");
const crypto = require("crypto-js");

const hash = string => {
  return crypto.SHA256(string).toString(crypto.enc.Hex);
};

const guidesController = {
  getGuides: (req, res) => {
    const email = req.query.email;
    if (email) {
      guidesModel
        .getGuide(email)
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
      guidesModel
        .getAllGuides()
        .then(result => {
          formResponse.success(res, 200, result);
        })
        .catch(error => {
          res.json(error);
        });
    }
  },
  //////////////////////////////////////////////////////////////////

  editProfile: async (req, res) => {
    const email = req.query.email;
    const body = req.body;

    let data = {};

    const guide = await guidesModel
      .getGuide(email)
      .then(result => {
        return result[0];
      })
      .catch(error => {
        res.json(error);
      });

    if (!guide) {
      errorMessagee = {
        error: "User not found!"
      };
      formResponse.success(res, 200, errorMessagee);
    }

    data = {
      ...guide.profile
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

    guidesModel
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
    await guidesModel
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

    const guide = await guidesModel
      .getGuide(email)
      .then(result => {
        return result[0];
      })
      .catch(error => {
        res.json(error);
      });

    if (!guide) {
      errorMessagee = {
        error: "User not found!"
      };
      formResponse.success(res, 200, errorMessagee);
    }

    if (guide.password != currentPassword) {
      const errorMessagee = {
        error: "Wrong Password!"
      };
      formResponse.success(res, 200, errorMessagee);
    } else {
      guidesModel
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
  deleteGuide: async (req, res) => {
    const email = req.query.email;

    guidesModel
      .deleteGuide(email)
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
  ///////////////////////////////////////////////////////////////////
  setLocation: (req, res) => {
      const email = req.query.email;
        const location = {
            longitude:req.body.longitude,
            latitude:req.body.latitude
        }

      guidesModel.setLocation(email,location)
      .then(result => {
        data = {
          email,
          location:{
              ...location
          }
        };
        formResponse.success(res, 200, data);
      })
      .catch(error => {
        res.json(error);
      });
  },
  //////////////////////////////////////////////////////////////////
  setStatus: (req, res) => {
    const email = req.query.email;
    const status = req.body.status;

    guidesModel
      .setStatus(email, status)
      .then(result => {
        data = {
          email,
          status
        };
        formResponse.success(res, 200, data);
      })
      .catch(error => {
        res.json(error);
      });
  },
};

module.exports = guidesController;
