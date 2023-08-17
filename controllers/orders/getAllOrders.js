const {
  order: { Order },
} = require('../../models');

module.exports = async (_, res) => {
  const orders = await Order.find();

  res.json({ orders, totalCount: orders.length });
};
