const {
  user: { User },
} = require('../../models');

const { checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.user;

  const user = await User.findByIdAndUpdate(id, { ...req.body });
  await checkNotFound(user, id, 'User');

  const updatedUser = await User.findById(id);
  const { username, userSurname, email, phone, role, access } = updatedUser;

  res.status(200).json({
    username,
    userSurname,
    email,
    phone,
    role,
    access,
  });
};
