const { Rating } = require('../models/rating');
const { errorHandler } = require('../handlingerror/errorhandler');
var jsrecommender = require('js-recommender');

var recommender = new jsrecommender.Recommender();

var table = new jsrecommender.Table();

exports.create = async (req, res) => {
  let rating = await Rating.findOne({
    user: req.profile,
    product: req.product,
  });

  if (!rating) {
    rating = new Rating(req.body);
    rating.user = req.profile;
    rating.product = req.product;
  } else {
    rating.rating = req.body.rating;
  }

  rating.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.rem = (req, res) => {
  Rating.find({}, function (err, data) {
    let userss = data.map((ratings) => {
      return ratings.user;
    });
    let products = data.map((ratings) => {
      return ratings.product;
    });
    let ratingss = data.map((ratings) => {
      return ratings.rating;
    });
    var arr = [];
    arr = [userss, products, ratingss];
    for (var i = 0; i < userss.length; i++) {
      table.setCell(products[i], userss[i], ratingss[i]);
    }
    var model = recommender.fit(table);
    console.log(model);

    predicted_table = recommender.transform(table);

    console.log(predicted_table);

    var product;
    var nu = [];
    var jk = [];

    for (var i = 0; i < predicted_table.columnNames.length; i++) {
      user = predicted_table.columnNames[i];
      console.log('For user: ' + user);
      for (var j = 0; j < predicted_table.rowNames.length; j++) {
        product = predicted_table.rowNames[j];
        nu[j] =
          '  Product [' +
          product +
          '] is predicted to have rating ' +
          Math.round(predicted_table.getCell(product, user));
      }

      jk[i] = 'For user ' + user + nu;
    }

    res.json(jk);
    console.log(table);
  });
};
