const {
  product: { Product },
} = require('../../models');
const { HttpError, checkNotFound } = require('../../helpers');

module.exports = async (order, productUpdates) => {
  const updatedOrder = JSON.parse(JSON.stringify(order));

  for (const productUpdate of productUpdates) {
    const { productId, quantity } = productUpdate;

    const existingProductIndex = updatedOrder.products.findIndex(
      product => product.productId.toString() === productId,
    );

    if (existingProductIndex !== -1) {
      const newProduct = await Product.findById(productId);

      await checkNotFound(newProduct, productId, 'Product');

      if (newProduct.quantity < quantity) {
        throw HttpError(
          409,
          `Product "${newProduct.name}" is out of stock: availability - ${newProduct.quantity}, user request - ${quantity}`,
        );
      }

      updatedOrder.products[existingProductIndex].quantity = quantity;
      updatedOrder.products[existingProductIndex].name = newProduct.name;
      updatedOrder.products[existingProductIndex].manufactureId =
        newProduct.manufactureId;
      updatedOrder.products[existingProductIndex].price = newProduct.price;
    } else {
      const newProduct = await Product.findById(productId);

      await checkNotFound(newProduct, productId, 'Product');

      if (newProduct.quantity < quantity) {
        throw HttpError(
          409,
          `Product "${newProduct.name}" is out of stock: availability - ${newProduct.quantity}, user request - ${quantity}`,
        );
      }

      updatedOrder.products.push({
        productId,
        quantity,
        name: newProduct.name,
        manufactureId: newProduct.manufactureId,
        price: newProduct.price,
      });
    }
  }

  updatedOrder.products = updatedOrder.products.filter(product => {
    return productUpdates.some(
      update => update.productId === product.productId.toString(),
    );
  });

  updatedOrder.totalTypeOfProducts = updatedOrder.products.length;
  updatedOrder.totalProducts = updatedOrder.products.reduce(
    (total, product) => total + product.quantity,
    0,
  );
  updatedOrder.updatedAt = new Date();

  return updatedOrder;
};
