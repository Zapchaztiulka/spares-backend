const {
  order: { Order },
} = require('../../models');
const { createOrder } = require('../../helpers/orderHelpers');
const { sendEmailWithOrderDetails } = require('../../helpers/sendEmail');

module.exports = async (req, res) => {
  const {
    products,
    phone,
    email = '',
    username = '',
    userSurname = '',
    adminTag = '',
    userComment = '',
    adminId = '',
    adminComment = '',
  } = req.body;

  const additionalData = {
    phone,
    email,
    username,
    userSurname,
    adminTag,
    userComment,
    adminId,
    adminComment,
  };

  const orderData = await createOrder(products, null, additionalData);
  const newOrder = await Order.create(orderData);

  if (email) {
    await sendEmailWithOrderDetails(newOrder);
  }

  return res.status(201).json(newOrder);
};
