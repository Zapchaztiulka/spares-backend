const {
  user: { User },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { token } = req.body;
  const user = await User.findOne({ token });

  if (!user) throw HttpError(401, 'Please reload the page');

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
