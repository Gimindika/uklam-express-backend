const packageItemsModel = require("../models/packageItems");
const formResponse = require("../helpers/form-response");
let ObjectId = require('mongodb').ObjectID

module.exports = {
  
  getPackageItems: (req, res) => {
    let id = req.query.id;
    if (id) {
      id = new ObjectId(id);
      
      packageItemsModel
        .getPackageItem(id)
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
      packageItemsModel
        .getAllPackageItems()
        .then(result => {
          formResponse.success(res, 200, result);
        })
        .catch(error => {
          res.json(error);
        });
    }
  },
 
  addPackageItem: (req, res) => {
    const guide = req.body.guide;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const photo = "https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?ixlib=rb-1.2.1&w=1000&q=80";

    let data = {
      name,
      photo,
      description,
      price,
      guide
    };

    packageItemsModel
      .addPackageItem( data)
      .then(result => {
        formResponse.success(res, 200 , data);
      })
      .catch(error => {
        res.json(error);
      });
  },

  editPhoto: async (req, res) => {
    const id = req.query.id;
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
      _id:id,
      photo: photo.url
    };
    await packageItemsModel
      .editPhoto(id, photo.url)
      .then(result => {
        formResponse.success(res, 200, data);
      })
      .catch(error => {
        res.json(error);
      });
  },

  // editPackageItem: (req, res) => {
  //   const id = req.params.id;
  //   let data = req.body;
  //   packageItemsModels
  //     .editPackageItem(id, data)
  //     .then(result => {
  //       data = {
  //         id,
  //         ...data
  //       }
  //       formResponse.success(res, 200, data);
  //     })
  //     .catch(error => res.json(error));
  // },
  deletePackageItem: (req, res) => {
    let id = req.query.id;
    id = new ObjectId(id);
    packageItemsModel
      .deletePackageItem(id)
      .then(result => {
        formResponse.success(res, 200, id);
      })
      .catch(error => res.json(error));
  }
};
