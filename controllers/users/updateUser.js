const {
  user: { User },
} = require('../../models');

const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.user;

  const user = await User.findByIdAndUpdate(id, { ...req.body });

  if (!user) throw HttpError(404, 'User not found');

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
