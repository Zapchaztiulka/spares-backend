const {
  user: { User },
} = require('../../models');

const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.user;

  if (!req.body) throw new HttpError({ message: 'Missing field' });

  const user = await User.findByIdAndUpdate(id, { ...req.body });

  if (!user) throw new HttpError('User not found');

  const updatedUser = await User.findById(id);
  const { username, userSurname, email, role } = updatedUser;

  res.status(200).json({
    username,
    userSurname,
    email,
    role,
  });
};
