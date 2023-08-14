const {
  order: { Order },
} = require('../../models');
const { HttpError } = require('../../helpers');
const { increaseProductQuantities } = require('../../helpers/orderHelpers');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { _id, role } = req.user;

  if (role === 'admin') {
    throw HttpError(
      403,
      'Forbidden. User with role "admin" can not delete the order of products. Change the role',
    );
  }

  const order = await Order.findOneAndDelete({ _id: id, userId: _id });
  if (!order) {
    throw HttpError(404, 'Order not found');
  }

  await increaseProductQuantities(order);

  res.json({ message: `Order with ID ${id} was deleted successfully` });
};
