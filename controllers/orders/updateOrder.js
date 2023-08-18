const {
  order: { Order },
} = require('../../models');
const { HttpError, patterns } = require('../../helpers');
const {
  updateProductInOrder,
  updateProductQuantitiesInStock,
} = require('../../helpers/orderHelpers');

module.exports = async (req, res) => {
  const { products, status: newStatus } = req.body;

  if (!req.body || !products || !newStatus) {
    throw HttpError(400, 'Missing body of request');
  }

  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) throw HttpError(404, 'Order not found');

  const previousStatus = order.status;
  if (
    previousStatus !== patterns.orderStatus[0] &&
    previousStatus !== patterns.orderStatus[1]
  ) {
    throw HttpError(
      403,
      `Forbidden. Admin can update the order which has status "${patterns.orderStatus[0]}" or "${patterns.orderStatus[1]}"`,
    );
  }

  const updatedOrder = await updateProductInOrder(order, products);
  updatedOrder.status = newStatus;

  await Order.findByIdAndUpdate(id, updatedOrder);

  await updateProductQuantitiesInStock(order.products, products, newStatus);

  res.json(updatedOrder);
};
