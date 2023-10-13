const {
  user: { User },
} = require('../../models');
const { HttpError } = require('..');

module.exports = async (data, type) => {
  const user = await User.findOne({ [type]: data });

  if (user) {
    throw HttpError(
      409,
      `User with ${type}: ${data} has already exist. Please change ${type}`,
    );
  }
};
