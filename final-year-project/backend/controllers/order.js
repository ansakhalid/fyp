const { Order } = require('../models/order');
const { errorHandler } = require('../handlingerror/errorhandler');




exports.orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate('products.product', 'id name price')
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      req.order = order;
      next();
    });
};

exports.create = (req, res) => {
  req.body.order.user = req.profile;

  const order = new Order(req.body.order);

  let a = order.user.email;

  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    const emaildata = {
      from: 'noreply@artink.com',
      to: a,
      subject: 'A new order is received',
      html: `
      <p>Customer name: ${order.user.name}</p>
      <p>Total products: ${order.products.length}</p>
      <p>Total cost: ${order.amount}</p>
      <p>Login to dashboard for more details.</p>
  `,
    };
    mg.messages().send(emaildata)

    

    res.json(data);
  });
};

exports.listOrders = (req, res) => {
  Order.find()
    .populate('user', ['_id', 'name', 'address'])
    .sort('-created')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      res.json(orders);
    });
};

exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path('status').enumValues);
};

exports.updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(order);
    }
  );
};
