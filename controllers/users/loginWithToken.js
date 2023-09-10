const {
  user: { User },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { token } = req.body;
  const user = await User.findOne({ token });

  if (!user) throw HttpError(401, 'Token is invalid');

  const { username, userSurname, role, email, phone, access } = user;

  res.status(200).json({
    username,
    userSurname,
    role,
    email,
    phone,
    access,
  });
};
