const {
  order: { Order },
} = require('../../models');

module.exports = async (req, res) => {
  const { _id, role } = req.user;

  if (role !== 'user' && req.params.userId) {
    // Admin user can view orders of a specific user
    const orders = await Order.find({ userId: req.params.userId });
    res.json({ orders, totalCount: orders.length });
  } else {
    // Regular user can view their own orders
    const orders = await Order.find({ userId: _id });
    res.json({ orders, totalCount: orders.length });
  }
};
