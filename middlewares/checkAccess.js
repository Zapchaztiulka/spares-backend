const { HttpError } = require('../helpers');

module.exports = (accessKey, titleAccess) => {
  return (req, _, next) => {
    const { user } = req;

    if (!user || !user.access || typeof user.access[accessKey] !== 'boolean') {
      throw HttpError(403, 'Forbidden. Access denied');
    }

    if (!user.access[accessKey]) {
      throw HttpError(403, `Forbidden. Access for "${titleAccess}" denied`);
    }

    next();
  };
};
