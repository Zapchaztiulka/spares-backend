const bcrypt = require('bcrypt');
const { customAlphabet } = require('nanoid');
const { addHours } = require('date-fns');

const {
  user: { User },
} = require('../../models');
const { patterns } = require('../../helpers');
const { checkExistingUserData } = require('../../helpers/userHelpers');
const { sendEmailForVerification } = require('../../helpers/sendEmail');
const { EXPIRES_VERIFICATION_TOKEN } = process.env;

module.exports = async (req, res) => {
  const { email, password, username, userSurname, phone, role } = req.body;
  const pureEmail = email.trim().toLowerCase();
  const purePassword = password.trim();
  const pureUsername = username?.trim();
  const pureUserSurname = userSurname?.trim();
  const purePhone = phone?.trim();
  const access =
    role === patterns.roles[0]
      ? {
          photoAddAccess: true,
          deleteProductAccess: true,
          updateProductAccess: true,
          deleteCategoryAccess: true,
          updateCategoryAccess: true,
        }
      : {};

  await checkExistingUserData(pureEmail, 'email');
  await checkExistingUserData(purePhone, 'phone');

  const generatedToken = customAlphabet(patterns.alphabet, 20);
  const hashPassword = await bcrypt.hash(purePassword, 10);
  const verificationToken = `${generatedToken()}-${addHours(
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
    access,
  });

  await sendEmailForVerification(pureEmail, verificationToken);

  return res.status(201).json({
    id: newUser._id,
    email: newUser.email,
    phone: newUser.phone,
    username: newUser.username,
    userSurname: newUser.userSurname,
    role: newUser.role,
    access: newUser.access,
  });
};
