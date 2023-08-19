const {
  order: { Order },
  user: { User },
} = require('../../models');
const { HttpError } = require('../../helpers');
const { createOrder } = require('../../helpers/orderHelpers');
const { sendEmailWithOrderDetails } = require('../../helpers/sendEmail');

module.exports = async (req, res) => {
  const { products, phone, email = '' } = req.body;

  const existingUser = await User.findOne({ phone });

  if (existingUser) {
    throw HttpError(
      400,
      'An account with this phone number already exists. Please log in first',
    );
  }

  const orderData = await createOrder(products, null, phone, email);
  const newOrder = await Order.create(orderData);

  if (email) {
    await sendEmailWithOrderDetails(newOrder);
  }

  const newOrderResponse = newOrder.toObject();
  delete newOrderResponse.username;
  delete newOrderResponse.userSurname;

  return res.status(201).json(newOrderResponse);
};
