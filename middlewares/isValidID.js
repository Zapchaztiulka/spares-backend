const { isValidObjectId } = require('mongoose');

const { HttpError } = require('../helpers');

const isValidId = (req, _, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid ID`));
  }
  next();
};

module.exports = isValidId;
