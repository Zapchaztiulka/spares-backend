const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const {
  user: { User },
} = require('../../models');
const { HttpError, sendEmail } = require('../../helpers');

module.exports = async (req, res) => {
  const { email, password, username, userSurname, role } = req.body;
  const pureEmail = email.trim();
  const purePassword = password.trim();
  const pureUsername = username?.trim();
  const pureUserSurname = userSurname?.trim();

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
    userSurname: pureUserSurname,
    password: hashPassword,
    role,
    verificationToken,
  });

  await sendEmail(pureEmail, verificationToken);

  return res.status(201).json({
    id: newUser._id,
    email: newUser.email,
    username: newUser.username,
    userSurname: newUser.userSurname,
    role: newUser.role,
  });
};
