const { HttpError } = require('../helpers');

module.exports = (req, _, next) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'Missing body of request');
  }

  next();
};
