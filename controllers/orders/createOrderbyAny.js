const {
  order: { Order },
} = require('../../models');
const { createOrder } = require('../../helpers/orderHelpers');
const { sendEmailWithOrderDetails } = require('../../helpers/sendEmail');

module.exports = async (req, res) => {
  const { products, phone, email = '', adminTag } = req.body;

  const orderData = await createOrder(products, null, phone, email, adminTag);
  const newOrder = await Order.create(orderData);

  if (email) {
    await sendEmailWithOrderDetails(newOrder);
  }

  const newOrderResponse = newOrder.toObject();

  if (!newOrderResponse.username) {
    delete newOrderResponse.username;
    delete newOrderResponse.userSurname;
  }

  return res.status(201).json(newOrderResponse);
};
