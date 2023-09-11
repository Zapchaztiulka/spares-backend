const {
  order: { Order },
} = require('../../models');
const { checkNotFound } = require('../../helpers');
const {
  updateProductQuantitiesInStock,
} = require('../../helpers/orderHelpers');

module.exports = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findOneAndDelete({ _id: id });
  await checkNotFound(order, id, 'Order');

  await updateProductQuantitiesInStock(order.products, []);

  res.json({ message: `Order with ID ${id} was deleted successfully` });
};
