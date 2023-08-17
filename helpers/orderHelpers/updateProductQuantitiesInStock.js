const {
  product: { Product },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (previousProducts, updatedProducts) => {
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

        if (existingProduct.quantity < Math.abs(quantityDifference)) {
          throw HttpError(
            400,
            `Insufficient quantity of product "${existingProduct.name}" in stock`,
          );
        }

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

      if (existingProduct.quantity < updatedProduct.quantity) {
        throw HttpError(
          400,
          `Insufficient quantity of product "${existingProduct.name}" in stock`,
        );
      }

      existingProduct.quantity -= updatedProduct.quantity;
      await existingProduct.save();
    }
  }
};
