const {
  order: { Order },
} = require('../../models');

module.exports = async productId => {
  try {
    const orders = await Order.find({
      'products.productId': productId,
      //   status: 'completed',
    });

    let resultQuantity = 0;

    orders.forEach(order => {
      order.products.forEach(product => {
        if (product.productId.toString() === productId.toString()) {
          resultQuantity += product.quantity;
        }
      });
    });

    return resultQuantity;
  } catch (error) {
    console.error('Error calculating total purchased:', error);
    return 0;
  }
};
