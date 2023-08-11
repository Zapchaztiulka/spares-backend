const {
  product: { Product },
  order: { Order },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { products, phone, email = '' } = req.body;

  const productDetails = await Promise.all(
    products.map(async product => {
      const { productId, quantity } = product;

      const availableProduct = await Product.findById(productId);

      if (!availableProduct) {
        throw HttpError(
          404,
          `Product with ID ${productId} not found for ordering`,
        );
      }

      const {
        name,
        price,
        manufactureId,
        quantity: availableQuantity,
      } = availableProduct;

      if (availableQuantity < quantity) {
        throw HttpError(
          400,
          `Product "${name}" is out of stock: availability - ${availableQuantity}, user request - ${quantity}`,
        );
      }

      return { productId, quantity, manufactureId, name, price };
    }),
  );

  const totalProducts = productDetails.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  const newOrder = await Order.create({
    phone,
    email,
    products: productDetails,
    totalTypeOfProducts: productDetails.length,
    totalProducts,
  });

  const newOrderResponse = newOrder.toObject();
  delete newOrderResponse.username;
  delete newOrderResponse.userSurname;

  res.status(201).json(newOrderResponse);
};
