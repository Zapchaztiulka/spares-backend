const {
  order: { Order },
  user: { User },
} = require('../../models');
const { HttpError, checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { adminTag, status, adminComment, orderIds } = req.body;
  const { id } = req.params;

  if (orderIds.length === 0) {
    throw HttpError(400, 'Orders Ids array must be not empty');
  }

  if (!adminTag && !status && !adminComment) {
    throw HttpError(
      400,
      'At least one of adminTag, status, or adminComment must be provided for update',
    );
  }

  const admin = await User.findById(id);
  await checkNotFound(admin, id, 'Manager');

  const orders = await Order.find({ _id: { $in: orderIds } });
  if (orders.length !== orderIds.length) {
    throw HttpError(404, 'One or more orders not found');
  }

  const updatedOrders = [];

  for (const order of orders) {
    const updateFields = {};

    if (adminTag) {
      updateFields.adminTag = adminTag;
    }

    if (status) {
      updateFields.status = status;
    }

    if (!updateFields.adminData) {
      updateFields.adminData = {};
    }
    if (adminComment) {
      updateFields.adminData.adminComment = adminComment;
    }
    updateFields.adminData.adminId = id;
    updateFields.adminData.adminName = admin.username;
    updateFields.adminData.adminSurname = admin.userSurname;

    const updatedOrder = await Order.findByIdAndUpdate(
      order._id,
      { $set: updateFields },
      { new: true },
    );

    updatedOrders.push(updatedOrder);
  }

  res.json(updatedOrders);
};
