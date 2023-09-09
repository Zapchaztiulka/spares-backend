const { HttpError } = require('../../helpers');

module.exports = (access, photo) => {
  if (!access && photo && photo?.length > 0) {
    throw HttpError(
      403,
      'Access denied. There is not permission to add product photos',
    );
  }
};
