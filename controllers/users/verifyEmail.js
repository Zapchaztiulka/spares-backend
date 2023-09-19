const {
  user: { User },
} = require('../../models');
const { HttpError, patterns } = require('../../helpers');

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
    if (user.role === patterns.roles[2]) {
      res.redirect('https://zapchaztiulka-catalog-frontend.vercel.app');
    } else {
      res.redirect('https://beamish-pudding-ee7a33.netlify.app/login');
    }
  } catch (err) {
    return next(
      HttpError(
        500,
        'Redirect failed. Please check your email for verification.',
      ),
    );
  }
};
