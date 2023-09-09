const {
  user: { User },
} = require('../../models');
const { HttpError, patterns } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  const user = await User.findById(id);

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  if (user.role !== patterns.roles[1]) {
    throw HttpError(
      403,
      `Forbidden. It is not possible to assign access for a user with a role other than '${patterns.roles[1]}'`,
    );
  }

  for (const key in updateFields) {
    if (key in user.access) {
      user.access[key] = updateFields[key];
    }
  }

  await user.save();

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
