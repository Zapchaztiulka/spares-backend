const {
  product: { Product },
} = require('../../models');
const { HttpError } = require('..');

module.exports = async (products, user, phone, email) => {
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

      availableProduct.quantity -= quantity;
      await availableProduct.save();

      return { productId, quantity, manufactureId, name, price };
    }),
  );

  const totalProducts = productDetails.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  const orderData = {
    products: productDetails,
    totalTypeOfProducts: productDetails.length,
    totalProducts,
  };

  if (user) {
    const {
      _id,
      role,
      username,
      userSurname,
      email: userEmail,
      phone: userPhone,
    } = user;

    if (role !== 'admin') {
      orderData.userId = _id;
      orderData.username = username;
      orderData.userSurname = userSurname;
      orderData.email = userEmail;
      orderData.phone = userPhone;
    } else {
      throw HttpError(
        403,
        'Forbidden. User with role "admin" can not order products. Change the role',
      );
    }
  } else {
    orderData.email = email;
    orderData.phone = phone;
  }

  return orderData;
};
