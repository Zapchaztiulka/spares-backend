const {
  order: { Order },
} = require('../../models');
const { checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);
  await checkNotFound(order, id, 'Order');

  res.json(order);
};
