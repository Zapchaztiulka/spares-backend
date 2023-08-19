const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const { addHours } = require('date-fns');

const {
  user: { User },
} = require('../../models');
const { HttpError } = require('../../helpers');
const { sendEmailForVerification } = require('../../helpers/sendEmail');
const { EXPIRES_VERIFICATION_TOKEN } = process.env;

module.exports = async (req, res) => {
  const { email, password, username, userSurname, phone, role } = req.body;
  const pureEmail = email.trim();
  const purePassword = password.trim();
  const pureUsername = username?.trim();
  const pureUserSurname = userSurname?.trim();
  const purePhone = phone?.trim();

  const user = await User.findOne({ email: pureEmail });
  if (user) {
    throw HttpError(
      409,
      `Email: ${email} has already registered. Please log in`,
    );
  }

  const hashPassword = await bcrypt.hash(purePassword, 10);
  const verificationToken = `${nanoid()}-${addHours(
    new Date(),
    EXPIRES_VERIFICATION_TOKEN,
  ).getTime()}`; // Append the expiration timestamp to the verification token

  const newUser = await User.create({
    ...req.body,
    email: pureEmail,
    username: pureUsername,
    userSurname: pureUserSurname,
    password: hashPassword,
    phone: purePhone,
    role,
    verificationToken,
  });

  await sendEmailForVerification(pureEmail, verificationToken);

  return res.status(201).json({
    id: newUser._id,
    email: newUser.email,
    phone: newUser.phone,
    username: newUser.username,
    userSurname: newUser.userSurname,
    role: newUser.role,
  });
};
