const {
  order: { Order },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { phone, adminTag } = req.body;

  if (!phone) throw HttpError(400, 'Phone is required');

  const order = await Order.findOne({ phone });
  if (!order) throw HttpError(404, `Orders with phone ${phone} do not exist`);

  await Order.updateMany({ phone }, { adminTag });

  const updatedOrders = await Order.find({ phone });

  res.json(updatedOrders);
};
