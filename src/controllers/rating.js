const ratingModel = require("../models/rating");
const guidesModel = require("../models/guides");
const formResponse = require("../helpers/form-response");

const ratingController = {
  addRating: async (req, res) => {
    const guide = req.query.email;
    const data = {
      guide: req.query.email,
      user: req.body.user,
      rating: req.body.rating,
      testimony: req.body.testimony
    };

    await ratingModel
      .addRating(data)
      .then(result => {
        console.log("rating added successfuly");
      })
      .catch(error => {
        res.json(error);
      });

    let guideRatings = [];
    guideRatings = await ratingModel
      .getRatingNumber(guide)
      .then(result => {
        return result;
      })
      .catch(error => {
        res.json(error);
      });

    function sumOfArray(sum, num) {
      return sum + num;
    }
    let total = guideRatings.reduce(sumOfArray);
    let averageRating = total / guideRatings.length;

    guidesModel
      .setRating(guide, averageRating)
      .then(result => {
        result = {
          data,
          rating: averageRating
        };
        formResponse.success(res, 200, result);
      })
      .catch(error => {
        res.json(error);
      });
  },

  getRating: (req, res) => {
    const guide = req.query.email;
    ratingModel.getRating(guide)
    .then(result => {
      formResponse.success(res, 200, result)
    })
    .catch(error => {
      res.json(error)
    })
  }
};

module.exports = ratingController;
