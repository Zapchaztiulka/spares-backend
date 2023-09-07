const {
  order: { Order },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { phone, adminTag } = req.body;

  const order = await Order.findOne({ phone });
  if (!order) throw HttpError(404, 'Phone not found');

  await Order.updateMany({ phone }, { adminTag });

  const updatedOrders = await Order.find({ phone });

  res.json(updatedOrders);
};
