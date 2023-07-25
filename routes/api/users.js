const router = require('express').Router();

const ctrl = require('../../controllers/users');
const googleAuth = require('../../controllers/users/googleAuth');
const {
  validateBody,
  authenticate,
  isValidId,
  passportConfig,
} = require('../../middlewares');
const {
  user: {
    validationAuthUser,
    validationUpdateUser,
    validationEmailUser,
    validationPasswordUser,
  },
} = require('../../models');

router.post('/register', validateBody(validationAuthUser), ctrl.register);
router.post('/login', validateBody(validationAuthUser), ctrl.login);
router.post('/login-with-token', ctrl.loginWithToken);
router.post('/logout', authenticate, ctrl.logout);

// Initialize Passport middleware
router.use(passportConfig.initialize());
router.use(passportConfig.session());

// GOOGLE authorization routers
router.get('/google', googleAuth.auth);
router.get('/google/callback', googleAuth.callback, googleAuth.successCallback);

// email verification
router.get('/verify/:verificationToken', ctrl.verifyEmail);

// resend email letter for verification
router.post(
  '/verify',
  validateBody(validationEmailUser),
  ctrl.resendVerifyEmail,
);

// get users by different way
router.get('/role', ctrl.getUserByRole);
router.get('/current', authenticate, ctrl.getCurrentUser);
router.get('/:id', isValidId, ctrl.getById);

// update user data
router.patch(
  '/update',
  authenticate,
  validateBody(validationUpdateUser),
  ctrl.updateUser,
);

// forgot password
router.patch(
  '/getNewPassword',
  validateBody(validationEmailUser),
  ctrl.getNewPassword,
);

// create new password
router.patch(
  '/createNewPassword',
  authenticate,
  validateBody(validationPasswordUser),
  ctrl.createNewPassword,
);

module.exports = router;
