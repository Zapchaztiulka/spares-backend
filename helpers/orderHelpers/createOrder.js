const {
  product: { Product },
  user: { User },
} = require('../../models');
const { checkNotFound, patterns } = require('..');
const { checkAvailableProductInStock } = require('../productHelpers');
const checkFieldMatching = require('./checkFieldMatching');

module.exports = async (products, user, additionalData) => {
  const {
    phone,
    email = '',
    username = '',
    userSurname = '',
    userMiddleName = '',
    userType,
    legalEntityData = null,
    deliveryMethodId,
    deliveryRegion = '',
    deliveryDistrict = '',
    deliveryCity = '',
    deliveryAddress = '',
    deliveryOffice = '',
    deliveryRate = 0,
    adminTag = '',
    userComment = '',
    adminId = '',
    adminComment = '',
  } = additionalData;

  await checkFieldMatching(additionalData, null);

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

  const deliveryMethod = patterns.deliveryMethods.find(
    method => method.deliveryMethodId === deliveryMethodId,
  );

  const orderData = {
    products: productDetails,
    userType: userType || '',
    legalEntityData,
    deliveryData: {
      deliveryMethodId,
      deliveryMethodName: deliveryMethod
        ? deliveryMethod.deliveryMethodName
        : '',
      deliveryRegion,
      deliveryDistrict,
      deliveryCity,
      deliveryAddress,
      deliveryOffice,
      deliveryRate,
    },
    adminTag,
    userComment,
    totalTypeOfProducts: productDetails.length,
    totalProducts,
    totalPrice,
    totalPriceWithDelivery: totalPrice + deliveryRate,
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
      orderData.userMiddleName = userMiddleName;
    }
  }

  if (userToUse) {
    orderData.userId = userToUse._id;
    orderData.username = userToUse.username;
    orderData.userSurname = userToUse.userSurname;
    orderData.userMiddleName = userMiddleName;
    orderData.email = userToUse.email;
    orderData.phone = userToUse.phone;
  }

  return orderData;
};
