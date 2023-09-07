const {
  order: { Order },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { _id, role } = req.user;
  const { id } = req.params;

  if (role !== 'user' && id) {
    // Admin user can view orders of a specific user
    const orders = await Order.find({ userId: id });
    res.json({ orders, totalCount: orders.length });
  } else if (role === 'user' && !id) {
    // Regular user can view their own orders
    const orders = await Order.find({ userId: _id });
    res.json({ orders, totalCount: orders.length });
  } else {
    throw HttpError(403, 'Forbidden. Token is invalid. Check role please');
  }
};
