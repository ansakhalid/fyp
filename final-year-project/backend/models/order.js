const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
  {
    products: {
      type: Array,
    },
    transaction_id: {
      type: String,
    },
    amount: {
      type: Number,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      default: 'Processing',
    },
    updated: {
      type: Date,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = { Order };
