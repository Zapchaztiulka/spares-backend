const bcrypt = require('bcrypt');

const {
  user: { User },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.user;

  if (!req.body) throw new HttpError({ message: 'Missing field' });
  const { password1, password2 } = req.body;
  if (password1 === password2) {
    const hashPassword = await bcrypt.hash(password1, 10);
    const user = await User.findByIdAndUpdate(id, {
      ...req.body,
      password: hashPassword,
    });

    if (!user) {
      throw HttpError(404, 'User is not found. Please check email');
    }
  } else {
    throw HttpError(401, 'Password is not the same, please re-enter');
  }

  return res.status(201).json({
    message: 'Password has been successfully changed',
  });
};
