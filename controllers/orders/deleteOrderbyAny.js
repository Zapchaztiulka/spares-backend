const {
  order: { Order },
} = require('../../models');
const { HttpError } = require('../../helpers');
const {
  updateProductQuantitiesInStock,
} = require('../../helpers/orderHelpers');

module.exports = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findOneAndDelete({ _id: id });
  if (!order) {
    throw HttpError(404, 'Order not found');
  }

  await updateProductQuantitiesInStock(order.products, []);

  res.json({ message: `Order with ID ${id} was deleted successfully` });
};
