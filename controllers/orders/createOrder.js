const {
  product: { Product },
  order: { Order },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { _id, role, username, userSurname, email } = req.user;
  const { products } = req.body;

  if (role === 'admin') {
    throw HttpError(
      403,
      'Forbidden. User with role "admin" can not order products. Change the role',
    );
  }

  const productDetails = await Promise.all(
    products.map(async product => {
      const { productId, quantity } = product;

      const {
        name,
        price,
        manufactureId,
        quantity: availableQuantity,
      } = await Product.findById(productId);

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
    userId: _id,
    username,
    userSurname,
    email,
    products: productDetails,
    totalTypeOfProducts: productDetails.length,
    totalProducts,
  });

  res.status(201).json(newOrder);
};
