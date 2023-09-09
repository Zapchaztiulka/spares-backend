const router = require('express').Router();

const ctrl = require('../../controllers/users');
const googleAuth = require('../../controllers/users/googleAuth');
const {
  validateBody,
  authenticate,
  isValidId,
  hasRole,
  checkRequestBody,
  passportConfig,
} = require('../../middlewares');
const {
  user: {
    validationAuthUser,
    validationUpdateUser,
    validationEmailUser,
    validationPasswordUser,
    validationAccess,
  },
} = require('../../models');
const { patterns } = require('../../helpers');

router.post(
  '/register',
  checkRequestBody,
  validateBody(validationAuthUser),
  ctrl.register,
);
router.post(
  '/login',
  checkRequestBody,
  validateBody(validationAuthUser),
  ctrl.login,
);
router.post('/login-with-token', checkRequestBody, ctrl.loginWithToken);
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
  checkRequestBody,
  validateBody(validationEmailUser),
  ctrl.resendVerifyEmail,
);

// get users by different way
router.get('/role', checkRequestBody, ctrl.getUserByRole);
router.get('/current', authenticate, ctrl.getCurrentUser);
router.get('/:id', isValidId, ctrl.getById);

// update user data
router.patch(
  '/update',
  checkRequestBody,
  authenticate,
  validateBody(validationUpdateUser),
  ctrl.updateUser,
);

// assign access for admin by super administrator
router.patch(
  '/assign-access/:id',
  checkRequestBody,
  authenticate,
  hasRole(patterns.roles[0]),
  isValidId,
  validateBody(validationAccess),
  ctrl.assignAccess,
);

// forgot password
router.patch(
  '/getNewPassword',
  checkRequestBody,
  validateBody(validationEmailUser),
  ctrl.getNewPassword,
);

// create new password
router.patch(
  '/createNewPassword',
  checkRequestBody,
  authenticate,
  validateBody(validationPasswordUser),
  ctrl.createNewPassword,
);

module.exports = router;
