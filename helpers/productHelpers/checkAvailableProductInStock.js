const { HttpError } = require('..');

module.exports = async (nameProduct, availableQuantity, quantity) => {
  if (availableQuantity < quantity) {
    throw HttpError(
      409,
      `Product "${nameProduct}" is out of stock: availability - ${availableQuantity}, user request - ${quantity}`,
    );
  }
};
