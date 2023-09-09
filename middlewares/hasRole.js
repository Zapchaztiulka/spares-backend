const { HttpError } = require('../helpers');

module.exports = requiredRoles => {
  return (req, _, next) => {
    const { role } = req.user;

    if (!Array.isArray(requiredRoles)) {
      requiredRoles = [requiredRoles];
    }

    if (!requiredRoles.includes(role)) {
      throw HttpError(
        403,
        `Forbidden. To access this resource the role must be one of: "${requiredRoles.join(
          ', ',
        )}"`,
      );
    }

    next();
  };
};
