const {
  order: { Order },
  user: { User },
} = require('../../models');
const { HttpError, checkNotFound } = require('../../helpers');
const {
  updateProductInOrder,
  updateProductQuantitiesInStock,
  checkFieldMatching,
} = require('../../helpers/orderHelpers');
const { checkExistingUserData } = require('../../helpers/userHelpers');

module.exports = async (req, res) => {
  const {
    products,
    status: newStatus,
    adminId,
    adminComment = '',
    ...additionalData
  } = req.body;

  const { id } = req.params;

  if (!products || !newStatus) {
    throw HttpError(400, 'Missing fields "products" or "status"');
  }

  let adminData = null;

  if (adminId) {
    const admin = await User.findById(adminId);
    await checkNotFound(admin, adminId, 'Manager');

    adminData = {
      adminId,
      adminName: admin.username,
      adminSurname: admin.userSurname,
      adminComment,
    };
  }

  const order = await Order.findById(id);
  await checkNotFound(order, id, 'Order');
  await checkFieldMatching(additionalData, order);

  const updatedOrder = await updateProductInOrder(
    order,
    products,
    additionalData.deliveryRate,
  );
  updatedOrder.adminData = adminData;
  updatedOrder.status = newStatus;

  Object.keys(additionalData).forEach(async field => {
    if (field === 'phone' || field === 'email') {
      await checkExistingUserData(additionalData[field], field);
    }

    if (field.startsWith('delivery')) {
      updatedOrder.deliveryData[field] = additionalData[field];
    } else updatedOrder[field] = additionalData[field];
  });

  const resultedOrder = await Order.findByIdAndUpdate(id, updatedOrder, {
    new: true,
  });

  await updateProductQuantitiesInStock(order.products, products, newStatus);

  res.json(resultedOrder);
};
