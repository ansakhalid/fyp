const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const RatingSchema = new mongoose.Schema(
  {
    rating: { type: Number },
    user: { type: ObjectId, ref: 'User' },
    product: { type: ObjectId, ref: 'Product' },

    // product:{type: Array},
    type: {
      type: Number,
      default: '1',
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = { Rating };
