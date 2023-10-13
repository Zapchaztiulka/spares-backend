const {
  product: { Product },
} = require('../../models');
const { patterns } = require('../../helpers');
const { checkAvailableProductInStock } = require('../productHelpers');

module.exports = async (previousProducts, updatedProducts, status) => {
  if (
    status === patterns.orderStatus[9] ||
    status === patterns.orderStatus[10] ||
    status === patterns.orderStatus[11]
  ) {
    // Increase product quantities in stock for cancelled or returned orders
    for (const product of updatedProducts) {
      const existingProduct = await Product.findById(product.productId);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
        await existingProduct.save();
      }
    }
    return;
  }

  for (const previousProduct of previousProducts) {
    const updatedProduct = updatedProducts.find(
      product =>
        product.productId.toString() === previousProduct.productId.toString(),
    );

    if (updatedProduct) {
      const quantityDifference =
        previousProduct.quantity - updatedProduct.quantity;

      if (quantityDifference > 0) {
        // Increase product quantity in stock
        const existingProduct = await Product.findById(
          previousProduct.productId,
        );
        existingProduct.quantity += quantityDifference;
        await existingProduct.save();
      } else if (quantityDifference < 0) {
        // Decrease product quantity in stock
        const existingProduct = await Product.findById(
          previousProduct.productId,
        );

        await checkAvailableProductInStock(
          existingProduct.name,
          existingProduct.quantity,
          updatedProduct.quantity,
        );

        existingProduct.quantity += quantityDifference;
        await existingProduct.save();
      }
      // else quantityDifference === 0, no changes needed for this product
    } else {
      // Product was removed from updated order, increase quantity in stock
      const existingProduct = await Product.findById(previousProduct.productId);
      existingProduct.quantity += previousProduct.quantity;
      await existingProduct.save();
    }
  }

  for (const updatedProduct of updatedProducts) {
    const previousProduct = previousProducts.find(
      product =>
        product.productId.toString() === updatedProduct.productId.toString(),
    );

    if (!previousProduct) {
      // New product added to updated order, decrease quantity in stock
      const existingProduct = await Product.findById(updatedProduct.productId);

      await checkAvailableProductInStock(
        existingProduct.name,
        existingProduct.quantity,
        updatedProduct.quantity,
      );

      existingProduct.quantity -= updatedProduct.quantity;
      await existingProduct.save();
    }
  }
};
