const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const {
  user: { User },
} = require('../../models');
const { HttpError, sendEmail } = require('../../helpers');

module.exports = async (req, res) => {
  const { email, password, username } = req.body;
  const pureEmail = email.trim();
  const purePassword = password.trim();
  const pureUsername = username.trim();

  const user = await User.findOne({ email: pureEmail });
  if (user) {
    throw HttpError(
      409,
      `Email: ${email} has already registered. Please log in`,
    );
  }

  const hashPassword = await bcrypt.hash(purePassword, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    email: pureEmail,
    username: pureUsername,
    password: hashPassword,
    verificationToken,
  });

  await sendEmail(pureEmail, verificationToken);

  return res.status(201).json({
    data: {
      id: newUser._id,
      email: newUser.email,
      username: newUser.username,
    },
    message: `User with email: ${newUser.email} has been created`,
  });
};
