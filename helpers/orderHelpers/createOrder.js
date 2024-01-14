const {
  product: { Product },
  user: { User },
} = require('../../models');
const { checkNotFound, patterns } = require('..');
const { checkAvailableProductInStock } = require('../productHelpers');

module.exports = async (products, user, additionalData) => {
  const productDetails = await Promise.all(
    products.map(async product => {
      const { productId, quantity } = product;

      const availableProduct = await Product.findById(productId);
      await checkNotFound(availableProduct, productId, 'Product');

      const {
        name,
        price: { value },
        vendorCode,
        units,
        quantity: availableQuantity,
      } = availableProduct;

      await checkAvailableProductInStock(name, availableQuantity, quantity);

      availableProduct.quantity -= quantity;

      if (availableProduct.quantity === 0) {
        availableProduct.availability = patterns.availability[2];
      }

      await availableProduct.save();

      return { productId, quantity, vendorCode, name, price: value, units };
    }),
  );

  const totalProducts = productDetails.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  const totalPrice = productDetails.reduce(
    (total, product) => total + product.quantity * product.price,
    0,
  );

  const {
    phone,
    email = '',
    username = '',
    userSurname = '',
    adminTag = '',
    userComment = '',
    adminId = '',
    adminComment = '',
  } = additionalData;

  const orderData = {
    products: productDetails,
    totalTypeOfProducts: productDetails.length,
    totalProducts,
    totalPrice,
    adminTag,
    userComment,
  };

  if (adminId) {
    const admin = await User.findById(adminId);
    await checkNotFound(admin, adminId, 'Manager');

    orderData.adminData = {
      adminId,
      adminName: admin.username,
      adminSurname: admin.userSurname,
      adminComment,
    };
  }

  let userToUse = user;

  if (!user) {
    userToUse = await User.findOne({ phone });

    if (!userToUse) {
      orderData.email = email;
      orderData.phone = phone;
      orderData.username = username;
      orderData.userSurname = userSurname;
    }
  }

  if (userToUse) {
    const {
      _id,
      username,
      userSurname,
      email: userEmail,
      phone: userPhone,
    } = userToUse;

    orderData.userId = _id;
    orderData.username = username;
    orderData.userSurname = userSurname;
    orderData.email = userEmail;
    orderData.phone = userPhone;
  }

  return orderData;
};
