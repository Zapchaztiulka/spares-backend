const {
  order: { Order },
} = require('../../models');
const { createOrder } = require('../../helpers/orderHelpers');
const { sendEmailWithOrderDetails } = require('../../helpers/sendEmail');

module.exports = async (req, res) => {
  const { products, adminTag } = req.body;
  const orderData = await createOrder(products, req.user, null, null, adminTag);
  const newOrder = await Order.create(orderData);

  await sendEmailWithOrderDetails(newOrder);

  return res.status(201).json(newOrder);
};
