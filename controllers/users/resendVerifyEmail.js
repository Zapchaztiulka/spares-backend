const {
  user: { User },
} = require('../../models');
const { HttpError } = require('../../helpers');
const { sendEmailForVerification } = require('../../helpers/sendEmail');

module.exports = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(
      404,
      `User with email: ${email} not found. Please check email`,
    );
  }
  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  await sendEmailForVerification(email, user.verificationToken);

  return res
    .status(200)
    .json({ message: `Verification email sent to ${email}` });
};
