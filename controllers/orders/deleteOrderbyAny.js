const {
  order: { Order },
} = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findOneAndDelete({ _id: id });
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json({ message: `Order with ID ${id} was deleted successfully` });
};
