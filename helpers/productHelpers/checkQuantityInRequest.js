const {
  product: { Product },
} = require('../../models');
const { HttpError, patterns, checkNotFound } = require('../../helpers');

module.exports = async (availability, quantity, id) => {
  if (!id) {
    if (availability !== patterns.availability[0] && quantity > 0) {
      throw HttpError(
        400,
        `If availability is not '${patterns.availability[0]}', quantity must be 0`,
      );
    }

    if (
      availability === patterns.availability[0] &&
      (quantity === 0 || quantity === 'undefined')
    ) {
      throw HttpError(
        400,
        `If availability is '${patterns.availability[0]}', quantity must be greater than 0`,
      );
    }
  }

  if (id) {
    if (quantity !== 'undefined' && availability) {
      if (availability !== patterns.availability[0] && quantity > 0) {
        throw HttpError(
          400,
          `If availability is not '${patterns.availability[0]}', quantity must be 0`,
        );
      }

      if (availability === patterns.availability[0] && quantity === 0) {
        throw HttpError(
          400,
          `If availability is '${patterns.availability[0]}', quantity must be greater than 0`,
        );
      }
    }

    if (quantity === 'undefined' && availability) {
      const product = await Product.findById(id);
      await checkNotFound(product, id, 'Product');
      const { quantity } = product;

      if (availability !== patterns.availability[0] && quantity > 0) {
        throw HttpError(
          400,
          `Quantity of product with ID: ${id} is ${quantity}. Able to set availability only '${patterns.availability[0]}'`,
        );
      }

      if (availability === patterns.availability[0] && quantity === 0) {
        throw HttpError(
          400,
          `Quantity of product with ID: ${id} is ${quantity}. Unable to set availability '${patterns.availability[0]}'`,
        );
      }
    }

    if (quantity && !availability) {
      const product = await Product.findById(id);
      await checkNotFound(product, id, 'Product');
      const { availability } = product;

      if (availability !== patterns.availability[0] && quantity > 0) {
        throw HttpError(
          400,
          `Unable to set quantity ${quantity} of product with ID: ${id} because its availability is NOT '${patterns.availability[0]}'`,
        );
      }

      if (availability === patterns.availability[0] && quantity === 0) {
        throw HttpError(
          400,
          `Unable to set quantity ${quantity} of product with ID: ${id} because its availability is '${patterns.availability[0]}'`,
        );
      }
    }

    if (quantity === 0 && !availability) {
      const product = await Product.findById(id);
      await checkNotFound(product, id, 'Product');
      const { availability } = product;

      if (availability === patterns.availability[0]) {
        throw HttpError(
          400,
          `Unable to set quantity ${quantity} of product with ID: ${id} because its availability is '${patterns.availability[0]}'`,
        );
      }
    }
  }
};
