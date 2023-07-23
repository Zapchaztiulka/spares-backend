const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const {
  user: { User },
} = require('../models');
const { GOOGLE_CLIENT_ID, GOOGLE_SECRET_KEY, CALLBACK_URL } = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET_KEY,
      callbackURL: CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { email, given_name } = profile._json;
        let user = await User.findOne({ email });

        if (!user) {
          const hashPassword = await bcrypt.hash(nanoid(), 10);

          user = await User.create({
            avatarURL: '',
            email,
            username: given_name,
            password: hashPassword,
            birthday: null,
            phone: '',
            skype: '',
            verify: true,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await User.findOne({ email });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const passportConfig = {
  initialize: () => passport.initialize(),
  session: () => passport.session(),
};

module.exports = passportConfig;
