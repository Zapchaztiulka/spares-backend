const {
  order: { Order },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { adminTag } = req.body;

  const orders = await Order.find({ adminTag });
  if (!orders.length) {
    throw HttpError(404, `Orders with admin tag "${adminTag}" do not exist`);
  }

  res.json(orders);
};
