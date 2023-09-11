const {
  user: { User },
} = require('../../models');
const { checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  await checkNotFound(user, id, 'User');

  const { username, userSurname, email, phone, role, access } = user;
  res.status(200).json({ username, userSurname, email, phone, role, access });
};
