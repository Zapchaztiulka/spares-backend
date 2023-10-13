const {
  order: { Order },
} = require('../../models');
const { HttpError, checkNotFound } = require('../../helpers');
const {
  updateProductInOrder,
  updateProductQuantitiesInStock,
} = require('../../helpers/orderHelpers');

module.exports = async (req, res) => {
  const { products, status: newStatus, adminTag: newAdminTag } = req.body;

  if (!products || !newStatus) {
    throw HttpError(400, 'Missing fields "products" or "status"');
  }

  const { id } = req.params;
  const order = await Order.findById(id);
  await checkNotFound(order, id, 'Order');

  const updatedOrder = await updateProductInOrder(order, products);
  updatedOrder.status = newStatus;

  if (newAdminTag) {
    updatedOrder.adminTag = newAdminTag;
  }

  await Order.findByIdAndUpdate(id, updatedOrder);

  await updateProductQuantitiesInStock(order.products, products, newStatus);

  res.json(updatedOrder);
};
