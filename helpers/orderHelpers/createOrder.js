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
        units,
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

      return { productId, quantity, manufactureId, name, price, units };
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
      username,
      userSurname,
      email: userEmail,
      phone: userPhone,
    } = user;

    orderData.userId = _id;
    orderData.username = username;
    orderData.userSurname = userSurname;
    orderData.email = userEmail;
    orderData.phone = userPhone;
  } else {
    orderData.email = email;
    orderData.phone = phone;
  }

  return orderData;
};
