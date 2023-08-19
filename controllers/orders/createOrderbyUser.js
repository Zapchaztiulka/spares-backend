const {
  order: { Order },
} = require('../../models');
const { createOrder } = require('../../helpers/orderHelpers');
const { sendEmailWithOrderDetails } = require('../../helpers/sendEmail');

module.exports = async (req, res) => {
  const orderData = await createOrder(req.body.products, req.user, null, null);
  const newOrder = await Order.create(orderData);

  await sendEmailWithOrderDetails(newOrder);

  return res.status(201).json(newOrder);
};
