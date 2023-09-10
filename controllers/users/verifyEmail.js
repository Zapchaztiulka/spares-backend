const {
  user: { User },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res, next) => {
  const { verificationToken } = req.params;

  // Extract the expiration timestamp from the verification token
  const [token, expirationTimestamp] = verificationToken.split('-');
  const expirationTime = parseInt(expirationTimestamp);
  const isVerifyTokenExpired = expirationTime < new Date().getTime();

  const user = await User.findOne({ verificationToken });

  // Check if the verification token has expired
  if (token && (isNaN(expirationTime) || isVerifyTokenExpired)) {
    if (user) {
      await User.findByIdAndDelete(user._id);
    }
    throw HttpError(
      401,
      'Verification token has expired. Please register repeatedly',
    );
  }

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: '',
  });

  try {
    res.redirect('https://github.com/Zapchaztiulka');
  } catch (err) {
    return next(
      HttpError(
        500,
        'Redirect failed. Please check your email for verification.',
      ),
    );
  }
};
