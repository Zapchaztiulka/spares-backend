const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  user: { User },
} = require('../../models');
const { HttpError } = require('../../helpers');
const { checkAvailableEmail } = require('../../helpers/userHelpers');

const { SECRET_KEY, EXPIRES_TOKEN } = process.env;

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const pureEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: pureEmail });
  await checkAvailableEmail(user, pureEmail);

  if (!user.verify) {
    throw HttpError(
      403,
      'Email is not verified yet. Check email box for verification',
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw HttpError(401, 'Password is incorrect. Please check');
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, {
    expiresIn: EXPIRES_TOKEN,
  });
  const loggedUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }, // to return upgraded user after searching because Mongoose returns user as he was before the update
  );

  const { username, userSurname, phone, role, access } = loggedUser;
  return res.status(200).json({
    username,
    userSurname,
    email: pureEmail,
    phone,
    role,
    token,
    access,
  });
};
