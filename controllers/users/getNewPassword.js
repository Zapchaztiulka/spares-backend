const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const {
  user: { User },
} = require('../../models');
const { sendEmailWithPassword } = require('../../helpers/sendEmail');
const { checkAvailableEmail } = require('../../helpers/userHelpers');

module.exports = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  await checkAvailableEmail(user, email);

  const newPassword = nanoid();
  const hashPassword = await bcrypt.hash(newPassword, 10);

  const newUser = await User.findOneAndUpdate(
    { email },
    {
      ...req.body,
      password: hashPassword,
    },
  );

  await sendEmailWithPassword(email, newPassword);

  return res.status(201).json({
    message: `New password has been sent to email: ${newUser.email}`,
  });
};
