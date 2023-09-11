const bcrypt = require('bcrypt');

const {
  user: { User },
} = require('../../models');
const { HttpError, checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.user;

  const { password1, password2 } = req.body;

  if (password1 === password2) {
    const hashPassword = await bcrypt.hash(password1, 10);
    const user = await User.findByIdAndUpdate(id, {
      ...req.body,
      password: hashPassword,
    });

    await checkNotFound(user, id, 'User');
  } else {
    throw HttpError(404, 'Password is not the same, please re-enter');
  }

  return res.status(201).json({
    message: 'Password has been successfully changed',
  });
};
