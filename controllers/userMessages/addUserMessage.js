const {
  userMessage: { UserMessage },
  product: { Product },
} = require('../../models');
const { patterns, HttpError, checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { productId, ...rest } = req.body;

  let messageId;

  if (!productId) {
    const newUserMessage = await UserMessage.create(req.body);
    messageId = newUserMessage._id;
  }

  if (productId) {
    const availableProduct = await Product.findById(productId);
    await checkNotFound(availableProduct, productId, 'Product');

    const { name, vendorCode, availability } = availableProduct;

    if (availability !== patterns.availability[1]) {
      throw HttpError(
        400,
        `Product with ID ${productId} cannot be pre-ordered because its availability is NOT "${patterns.availability[1]}"`,
      );
    }

    const msgData = {
      ...rest,
      productData: {
        productId,
        productName: name,
        vendorCode,
      },
    };

    const newUserMessage = await UserMessage.create(msgData);
    messageId = newUserMessage._id;
  }

  const newUserMessage = await UserMessage.findById(messageId);
  return res.status(201).json(newUserMessage);
};
