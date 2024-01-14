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
    adminTag,
  } = req.body;

  const userData = { phone, email, username, userSurname };

  const orderData = await createOrder(products, null, userData, adminTag);
  const newOrder = await Order.create(orderData);

  if (email) {
    await sendEmailWithOrderDetails(newOrder);
  }

  return res.status(201).json(newOrder);
};
