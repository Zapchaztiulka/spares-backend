const { isValidObjectId } = require('mongoose');

const {
  userRequest: { UserRequest },
  product: { Product },
} = require('../../models');
const { checkNotFound, HttpError } = require('../../helpers');
const { sendEmailWithUserRequest } = require('../../helpers/sendEmail');

module.exports = async (req, res) => {
  const { email, productId } = req.body;

  if (!isValidObjectId(productId)) {
    throw HttpError(400, `ID ${productId} is not valid ID`);
  }

  const sameRequest = await UserRequest.findOne({ email, productId });
  if (sameRequest) {
    throw HttpError(
      400,
      `The user with email:"${email}" has already left a request for the appearance of the product with ID ${productId}`,
    );
  }

  const availableProduct = await Product.findById(productId);
  await checkNotFound(availableProduct, productId, 'Product');

  const { quantity, name, vendorCode } = availableProduct;

  if (availableProduct.quantity !== 0) {
    throw HttpError(
      400,
      `The product "${name}" is available in stock (its quantity is ${quantity}). The request for its appearance is incorrect`,
    );
  }

  const requestData = {
    email,
    productId,
    productName: name,
    vendorCode,
  };

  const newRequest = await UserRequest.create({ email, productId });

  await sendEmailWithUserRequest(requestData);

  return res.status(201).json(newRequest);
};
