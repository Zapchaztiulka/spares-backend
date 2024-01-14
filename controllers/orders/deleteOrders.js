const {
  order: { Order },
  order,
} = require('../../models');
const { HttpError } = require('../../helpers');
const {
  updateProductQuantitiesInStock,
} = require('../../helpers/orderHelpers');

module.exports = async (req, res) => {
  const { orderIds } = req.body;

  const foundOrders = await Order.find({ _id: { $in: orderIds } });

  const foundOrderIds = foundOrders.map(order => order._id.toString());
  const notFoundOrderIds = orderIds.filter(
    orderId => !foundOrderIds.includes(orderId),
  );

  if (notFoundOrderIds.length === 0) {
    const deleteResult = await Order.deleteMany({ _id: { $in: orderIds } });

    const { deletedCount } = deleteResult;
    if (deletedCount > 0) {
      for (const order of foundOrders) {
        await updateProductQuantitiesInStock(order.products, []);
      }
      return res.status(200).json({
        message: `${deletedCount} orders were deleted successfully`,
      });
    }
  } else {
    throw HttpError(
      404,
      `Orders with IDs ${notFoundOrderIds.join(', ')} were not found`,
    );
  }

  res.status(204).json();
};
