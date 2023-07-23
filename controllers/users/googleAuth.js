const passport = require('passport');
const jwt = require('jsonwebtoken');
const {
  user: { User },
} = require('../../models');
const { SECRET_KEY, EXPIRES_TOKEN } = process.env;

module.exports = {
  auth: passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),

  callback: passport.authenticate('google', {
    failureRedirect: '/api/users/login',
  }),

  successCallback: async (req, res) => {
    const { _id: id } = req.user;

    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_TOKEN });
    await User.findByIdAndUpdate(id, { token });

    res.redirect(
      `https://oleh-kliapko.github.io/GooseTrack_front?token=${token}`,
    );
  },
};
