const {
  order: { Order },
} = require('../../models');
const { HttpError } = require('../../helpers');
const { increaseProductQuantities } = require('../../helpers/orderHelpers');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const order = await Order.findOneAndDelete({ _id: id, userId: _id });
  if (!order) {
    throw HttpError(404, 'Order not found');
  }

  await increaseProductQuantities(order);

  res.json({ message: `Order with ID ${id} was deleted successfully` });
};
