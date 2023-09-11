const { HttpError } = require('..');

module.exports = async (credential, email) => {
  if (!credential) {
    throw HttpError(
      404,
      `User with email: ${email} not found. Please check email`,
    );
  }
};
