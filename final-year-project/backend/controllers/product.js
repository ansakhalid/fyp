const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../handlingerror/errorhandler');
const { Rating } = require('../models/rating');
const mongoose = require('mongoose');
const { type } = require('os');

exports.productById = (req, res, next, id) => {
  Product.findOne({ _id: id, deleted: false })
    .populate('category')
    .lean(true)
    .exec(async (err, p) => {
      if (err || !p) {
        return res.status(400).json({
          error: 'Product not found',
        });
      }

      const rating = await Rating.find({
        product: mongoose.Types.ObjectId(p._id),
      });

      const product = {
        ...p,
        rating,
      };

      req.product = product;
      next();
    });
};

exports.read = (req, res) => {
  // req.product.photo = undefined;
  return res.json(req.product);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Error: Image could not be uploaded',
      });
    }

    const {
      name,
      description,
      price,
      quantity,
      shipping,
      finalImageURL,
      category,
    } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !quantity ||
      !shipping ||
      !category
    ) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    let product = new Product(fields);

    // Setting the product image
    product.photo = finalImageURL;

    product.save((err, result) => {
      if (err) {
        console.log('PRODUCT CREATE ERROR ', err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.remove = async (req, res) => {
  await Product.findOneAndUpdate(
    { _id: req.params.productId },
    {
      $set: {
        deleted: true,
      },
    },
    { new: false }
  );

  res.json({ msg: 'Product removed' });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }

    const {
      name,
      description,
      price,
      quantity,
      shipping,
      finalImageURL,
      category,
    } = fields;

    const { id } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !quantity ||
      !shipping ||
      !category
    ) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    let product = await Product.findById(id);
    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.shipping = shipping;
    product.category = category;

    // Updating the product image
    product.photo = finalImageURL;

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find({ deleted: false })
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .lean(true)
    .exec(async (err, ps) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found',
        });
      }

      let products = await Promise.all(
        ps.map(async (p) => {
          const rating = await Rating.find({
            product: mongoose.Types.ObjectId(p._id),
          });
          return {
            ...p,
            rating,
          };
        })
      );

      res.json(products);
    });
};

exports.listRecommended = (req, res) => {
  Product.find({ deleted: false })
    .populate('category')
    .lean(true)
    .exec(async (err, ps) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found',
        });
      }

      let products = await Promise.all(
        ps.map(async (p) => {
          const ratings = await Rating.find({
            product: mongoose.Types.ObjectId(p._id),
          });

          // Check if the average rating is greater than or equal to 3 then return the product
          let count = ratings.length;
          let sumOfRatings = 0;
          ratings.map((rating) => (sumOfRatings += rating.rating));

          const averageRating = sumOfRatings / count;

          if (averageRating >= 3) {
            return {
              ...p,
              rating: ratings,
            };
          }

          return null;
        })
      );

      products = products.filter((product) => product !== null);

      products.sort((a, b) => {
        return 0.5 - Math.random();
      });

      res.json(products);
    });
};

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find({
    _id: { $ne: req.product },
    category: req.product.category,
    deleted: false,
  })
    .lean(true)
    .limit(limit)
    .populate('category', '_id name')
    .exec(async (err, ps) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found',
        });
      }

      let products = await Promise.all(
        ps.map(async (p) => {
          const rating = await Rating.find({
            product: mongoose.Types.ObjectId(p._id),
          });
          return {
            ...p,
            rating,
          };
        })
      );

      res.json(products);
    });
};

exports.listCategories = (req, res) => {
  Product.distinct('category', {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: 'Categories not found',
      });
    }
    res.json(categories);
  });
};

exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  findArgs = { ...findArgs, deleted: false };

  Product.find(findArgs)
    .lean(true)
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec(async (err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found',
        });
      }

      let products = await Promise.all(
        data.map(async (p) => {
          const rating = await Rating.find({
            product: mongoose.Types.ObjectId(p._id),
          });
          return {
            ...p,
            rating,
          };
        })
      );

      res.json(products);
    });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.image = async (req, res) => {
  const productID = req.params.productId;
  const p = await Product.findById(productID).lean(true).select('photo');
  res.contentType('image/jpeg');
  res.send(p.photo.data);
};

exports.listSearch = (req, res) => {
  const query = {};
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };
    if (req.query.category && req.query.category != 'All') {
      query.category = req.query.category;
    }
    query.deleted = false;

    Product.find(query)
      // .select("-photo")
      .lean(true)
      .exec(async (err, ps) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }

        let products = await Promise.all(
          ps.map(async (p) => {
            const rating = await Rating.find({
              product: mongoose.Types.ObjectId(p._id),
            });
            return {
              ...p,
              rating,
            };
          })
        );

        res.json(products);
      });
  }
};

exports.decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: 'Could not update product',
      });
    }
    next();
  });
};
