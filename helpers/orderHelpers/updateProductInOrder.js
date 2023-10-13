const {
  product: { Product },
} = require('../../models');
const { checkNotFound } = require('..');
const { checkAvailableProductInStock } = require('../productHelpers');

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

      await checkAvailableProductInStock(
        newProduct.name,
        newProduct.quantity,
        quantity,
      );

      updatedOrder.products[existingProductIndex].quantity = quantity;
      updatedOrder.products[existingProductIndex].name = newProduct.name;
      updatedOrder.products[existingProductIndex].vendorCode =
        newProduct.vendorCode;
      updatedOrder.products[existingProductIndex].price =
        newProduct.price.value;
    } else {
      const newProduct = await Product.findById(productId);

      await checkNotFound(newProduct, productId, 'Product');

      await checkAvailableProductInStock(
        newProduct.name,
        newProduct.quantity,
        quantity,
      );

      updatedOrder.products.push({
        productId,
        quantity,
        name: newProduct.name,
        vendorCode: newProduct.vendorCode,
        price: newProduct.price.value,
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
