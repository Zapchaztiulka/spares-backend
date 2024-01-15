const {
  order: { Order },
  user: { User },
} = require('../../models');
const { HttpError, checkNotFound } = require('../../helpers');
const {
  updateProductInOrder,
  updateProductQuantitiesInStock,
} = require('../../helpers/orderHelpers');
const { checkExistingUserData } = require('../../helpers/userHelpers');

module.exports = async (req, res) => {
  const {
    username: newUsername,
    userSurname: newUserSurname,
    phone: newPhone,
    email: newEmail,
    products,
    status: newStatus,
    adminTag: newAdminTag,
    userComment: newUserComment,
    adminId: newAdminId,
    adminComment: newAdminComment = '',
  } = req.body;

  const { id } = req.params;

  if (!products || !newStatus) {
    throw HttpError(400, 'Missing fields "products" or "status"');
  }

  let adminData = null;

  if (newAdminId) {
    const admin = await User.findById(newAdminId);
    await checkNotFound(admin, newAdminId, 'Manager');

    adminData = {
      adminId: newAdminId,
      adminName: admin.username,
      adminSurname: admin.userSurname,
      adminComment: newAdminComment,
    };
  }

  const order = await Order.findById(id);
  await checkNotFound(order, id, 'Order');

  const updatedOrder = await updateProductInOrder(order, products);
  updatedOrder.status = newStatus;

  if (newUsername) {
    updatedOrder.username = newUsername;
  }

  if (newUserSurname) {
    updatedOrder.userSurname = newUserSurname;
  }

  if (newPhone) {
    await checkExistingUserData(newPhone, 'phone');
    updatedOrder.phone = newPhone;
  }

  if (newEmail) {
    await checkExistingUserData(newEmail, 'email');
    updatedOrder.email = newEmail;
  }

  if (newAdminTag) {
    updatedOrder.adminTag = newAdminTag;
  }

  if (newUserComment) {
    updatedOrder.userComment = newUserComment;
  }

  updatedOrder.adminData = adminData;

  await Order.findByIdAndUpdate(id, updatedOrder);

  await updateProductQuantitiesInStock(order.products, products, newStatus);

  res.json(updatedOrder);
};
