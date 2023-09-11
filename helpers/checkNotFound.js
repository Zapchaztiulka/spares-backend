const HttpError = require('./HttpError');

module.exports = async (credential, id, nameCredential) => {
  if (!credential) {
    throw HttpError(404, `${nameCredential} with ID ${id} not found`);
  }
};
