const {
  order: { Order },
} = require('../../models');
const { HttpError } = require('../../helpers');
const {
  updateProductInOrder,
  updateProductQuantitiesInStock,
} = require('../../helpers/orderHelpers');

module.exports = async (req, res) => {
  if (!req.body || !req.body.products) {
    throw HttpError(400, 'Missing body of request');
  }

  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) throw HttpError(404, 'Order not found');

  const { products } = req.body;

  const updatedOrder = await updateProductInOrder(order, products);

  await Order.findByIdAndUpdate(id, updatedOrder);

  await updateProductQuantitiesInStock(order.products, products);

  res.json(updatedOrder);
};
