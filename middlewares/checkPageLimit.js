const { HttpError, patterns } = require('../helpers');

module.exports = (req, _, next) => {
  const { page, limit } = req.query;

  if (page === undefined && limit === undefined) return next();

  if (!patterns.isNumeric(page) || !patterns.isNumeric(limit)) {
    throw HttpError(400, 'Page and limit must be numbers');
  }

  next();
};
