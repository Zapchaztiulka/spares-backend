const {
  order: { Order },
} = require('../../models');
const { HttpError, checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { adminTag } = req.body;
  const { id } = req.params;

  const order = await Order.findById(id);
  await checkNotFound(order, id, 'Order');

  if (!adminTag) {
    throw HttpError(400, 'Missing adminTag parameter in the request body');
  }

  const { phone } = order;

  if (!phone) {
    throw HttpError(
      404,
      `Phone does not exist in the order with ID ${id}. Unable to perform admin tag assignment operation`,
    );
  }

  await Order.updateMany({ phone }, { adminTag });

  const updatedOrders = await Order.find({ phone });

  res.json(updatedOrders);
};
