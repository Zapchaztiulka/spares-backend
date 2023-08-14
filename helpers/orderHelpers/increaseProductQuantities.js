const {
  product: { Product },
} = require('../../models');

module.exports = async order => {
  for (const product of order.products) {
    const availableProduct = await Product.findById(product.productId);
    if (availableProduct) {
      availableProduct.quantity += product.quantity;
      await availableProduct.save();
    }
  }
};
