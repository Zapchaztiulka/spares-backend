const { HttpError } = require('../helpers');

module.exports = requiredRole => {
  return (req, _, next) => {
    const { role } = req.user;

    if (role !== requiredRole) {
      throw HttpError(
        403,
        `Forbidden. The role must be "${requiredRole}" to access this resource`,
      );
    }

    next();
  };
};
