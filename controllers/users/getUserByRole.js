const {
  user: { User },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { role } = req.body;

  const users = await User.find({ role });

  if (!users || !users.length) {
    throw HttpError(404, `Users with role "${role}" not found`);
  }

  const totalCount = users.length;
  const serializeUsers = users.map(user => ({
    username: user.username,
    userSurname: user.userSurname,
    email: user.email,
    phone: user.phone,
    role: user.role,
  }));

  res.status(200).json({
    totalCount,
    users: serializeUsers,
  });
};
