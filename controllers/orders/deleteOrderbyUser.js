const {
  order: { Order },
} = require('../../models');
const { checkNotFound } = require('../../helpers');
const {
  updateProductQuantitiesInStock,
} = require('../../helpers/orderHelpers');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const order = await Order.findOneAndDelete({ _id: id, userId: _id });
  await checkNotFound(order, id, 'Order');

  await updateProductQuantitiesInStock(order.products, []);

  res
    .status(204)
    .json({ message: `Order with ID ${id} was deleted successfully` });
};
