const {
  product: { Product },
} = require('../../models');
const { HttpError, checkNotFound } = require('..');

module.exports = async (products, user, phone, email, adminTag) => {
  const productDetails = await Promise.all(
    products.map(async product => {
      const { productId, quantity } = product;

      const availableProduct = await Product.findById(productId);
      await checkNotFound(availableProduct, productId, 'Product');

      const {
        name,
        price,
        vendorCode,
        units,
        quantity: availableQuantity,
      } = availableProduct;

      if (availableQuantity < quantity) {
        throw HttpError(
          409,
          `Product "${name}" is out of stock: availability - ${availableQuantity}, user request - ${quantity}`,
        );
      }

      availableProduct.quantity -= quantity;
      await availableProduct.save();

      return { productId, quantity, vendorCode, name, price, units };
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
    adminTag,
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
