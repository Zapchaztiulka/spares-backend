const {
  user: { User },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  const { username, userSurname, email, phone, role } = user;
  res.status(200).json({ username, userSurname, email, phone, role });
};
