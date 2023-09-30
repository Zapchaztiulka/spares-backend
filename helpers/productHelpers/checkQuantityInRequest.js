const { HttpError, patterns } = require('../../helpers');

module.exports = (availability, quantity) => {
  if (availability !== patterns.availability[0] && quantity !== 0) {
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
};
