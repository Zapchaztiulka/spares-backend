const {
  order: { Order },
} = require('../../models');
const { createOrder } = require('../../helpers/orderHelpers');
const { sendEmailWithOrderDetails } = require('../../helpers/sendEmail');

module.exports = async (req, res) => {
  const { products, ...additionalData } = req.body;

  const orderData = await createOrder(products, null, additionalData);
  const newOrder = await Order.create(orderData);

  if (newOrder.email) {
    await sendEmailWithOrderDetails(newOrder);
  }

  return res.status(201).json(newOrder);
};
