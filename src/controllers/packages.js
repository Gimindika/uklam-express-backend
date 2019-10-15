const packagesModel = require("../models/packages");
const packageItemsModel = require("../models/packageItems");
const formResponse = require("../helpers/form-response");
const cloudinary = require("../configs/cloudinaryConfig");
let ObjectId = require("mongodb").ObjectID;

module.exports = {
  getPackages: (req, res) => {
    let id = req.query.id;
    let type = req.query.type;

    if (type) {
      packagesModel
        .getPackageByType(type)
        .then(result => {
          if (result.length) {
            formResponse.success(res, 200, result);
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
    } else if (id) {
      id = new ObjectId(id);

      packagesModel
        .getPackage(id)
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
      packagesModel
        .getAllPackages()
        .then(result => {
          formResponse.success(res, 200, result);
        })
        .catch(error => {
          res.json(error);
        });
    }
  },

  addPackage: async (req, res) => {
    const guide = req.body.guide;
    const name = req.body.name;
    const description = req.body.description;
    let packageItems = req.body.packageItems;
    // const price = req.body.price;
    const photo =
      "https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?ixlib=rb-1.2.1&w=1000&q=80";

    let price = 0;
    const items = [];
    for (let i = 0; i < packageItems.length; i++) {
      let tmp = await packageItemsModel
        .getPackageItem(new ObjectId(packageItems[i]))
        .then(result => {
          return result[0];
        });
      price += tmp.price;
      items.push(tmp);
    }
    packageItems = [...items];

    let data = {
      name,
      photo,
      description,
      packageItems,
      price,
      guide
    };

    packagesModel
      .addPackage(data)
      .then(result => {
        formResponse.success(res, 200, data);
      })
      .catch(error => {
        res.json(error);
      });
  },

  editPhoto: async (req, res) => {
    let id = req.query.id;
    id = new ObjectId(id);
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
      _id: id,
      photo: photo.url
    };
    await packagesModel
      .editPhoto(id, photo.url)
      .then(result => {
        formResponse.success(res, 200, data);
      })
      .catch(error => {
        res.json(error);
      });
  },

  editPackage: async (req, res) => {
    let id = req.query.id;
    id = new ObjectId(id);
    let body = req.body;

    const package = await packagesModel
      .getPackage(id)
      .then(result => {
        return result[0];
      })
      .catch(error => {
        res.json(error);
      });

    if (!package) {
      errorMessagee = {
        error: "Item not found!"
      };
      formResponse.success(res, 200, errorMessagee);
    }

    data = {
      ...package
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

    let price = 0;
    const items = [];
    for (let i = 0; i < data.packageItems.length; i++) {
      let tmp = await packageItemsModel
        .getPackageItem(new ObjectId(data.packageItems[i]))
        .then(result => {
          return result[0];
        });
      price += tmp.price;
      items.push(tmp);
    }
    const packageItems = [...items];

    data = {
      ...data,
      price,
      packageItems
    };

    packagesModel
      .editPackage(id, data)
      .then(result => {
        data = {
          _id: id,
          ...data
        };
        formResponse.success(res, 200, data);
      })
      .catch(error => {
        res.json(error);
      });
  },

  deletePackage: (req, res) => {
    let id = req.query.id;
    id = new ObjectId(id);
    packagesModel
      .deletePackage(id)
      .then(result => {
        formResponse.success(res, 200, id);
      })
      .catch(error => res.json(error));
  }
};
