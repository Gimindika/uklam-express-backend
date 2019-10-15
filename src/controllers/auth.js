const authModel = require("../models/auth");
const usersModel = require("../models/users");
const guidesModel = require("../models/guides");
const formResponse = require("../helpers/form-response");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_KEY;
const hash = string => {
  return crypto.SHA256(string).toString(crypto.enc.Hex);
};

const authController = {
  login: async (req, res) => {
    const email = req.body.email;
    const password = hash(req.body.password);
    const role = req.body.role;

    if (role == "guide") {
      //with then
      await guidesModel
        .getGuide(email)
        .then(result => {
          return result[0];
        })
        .then(guide => {
          if (!guide) {
            formResponse.success(res, 400, { error: "User not Found!" });
          } else {
            if (guide.password != password) {
              formResponse.success(res, 400, { error: "Wrong Password" });
            } else {
              const payload = { ...guide };

              jwt.sign(payload, secret, (err, token) => {
                if (err) {
                  formResponse.success(res, 400, err);
                }

                res.setHeader("Authorization", `Bearer ${token}`);
                const data = {
                  guide: {
                    // ...result[0]
                    id: guide.id,
                    profile: guide.profile,
                    email: guide.email,
                    photo: guide.photo,
                    balance: guide.balance,
                    location: guide.location,
                    rating: guide.rating
                  },
                  token
                };
                formResponse.success(res, 200, data);
              });
            }
          }
        })
        .catch(error => {
          res.json(error);
        });
    } else {
      //role else
      //with assigning user to variable
      const user = await usersModel
        .getUser(email)
        .then(result => {
          return result[0];
        })
        .catch(error => {
          res.json(error);
        });

      if (!user) {
        formResponse.success(res, 400, { error: "User not Found!" });
      } else {
        if (user.password != password) {
          formResponse.success(res, 400, { error: "Wrong Password" });
        } else {
          const payload = { ...user };

          jwt.sign(payload, secret, (err, token) => {
            if (err) {
              formResponse.success(res, 400, err);
            }

            res.setHeader("Authorization", `Bearer ${token}`);
            const data = {
              guide: {
                // ...result[0]
                id: user.id,
                profile: user.profile,
                email: user.email,
                photo: user.photo,
                balance: user.balance
              },
              token
            };
            formResponse.success(res, 200, data);
          });
        }
      }
    }
  },

  register: async (req, res) => {
    let body = {
      email: req.body.email,
      password: hash(req.body.password)
    };
    const name = req.body.name;
    const role = req.body.role;

    if (role == "guide") {
      guidesModel
        .getGuide(body.email)
        .then(result => {
          if (result.length > 0) {
            formResponse.success(res, 403, {
              error: "Email is already registered!"
            });
          } else {
            body = {
              ...body,
              profile: {
                name: name,
                address: "Address",
                phone: "Phone",
                language: ["Bahasa", "English"]
              },
              photo: "https://image.flaticon.com/icons/png/512/44/44948.png",
              balance: 0,
              location: {
                longitude: 0,
                latitude: 0
              },
              rating: 0,
              status: "unavailable"
            };
            guidesModel
              .register(body)
              .then(result => {
                formResponse.success(res, 200, body);
              })
              .catch(error => {
                res.json(error);
              });
          }
        })
        .catch(error => {
          res.json(error);
        });
    } else {
      usersModel
        .getUser(body.email)
        .then(result => {
          if (result.length > 0) {
            formResponse.success(res, 403, {
              error: "Email is already registered!"
            });
          } else {
            body = {
              ...body,
              profile: {
                name: name,
                address: "Address",
                phone: "Phone"
              },
              photo: "https://image.flaticon.com/icons/png/512/44/44948.png",
              balance: 0,
              currentOrder:{}
            };
            usersModel
              .register(body)
              .then(result => {
                formResponse.success(res, 200, body);
              })
              .catch(error => {
                res.json(error);
              });
          }
        })
        .catch(error => {
          res.json(error);
        });
    }
  }
};

module.exports = authController;
