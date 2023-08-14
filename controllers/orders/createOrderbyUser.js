const {
  order: { Order },
} = require('../../models');
const { createOrder } = require('../../helpers/orderHelpers');

module.exports = async (req, res) => {
  const orderData = await createOrder(req.body.products, req.user, null, null);
  const newOrder = await Order.create(orderData);

  res.status(201).json(newOrder);
};
