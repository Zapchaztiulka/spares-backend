const { ctrlWrapper } = require('../../helpers');

module.exports = {
  register: ctrlWrapper(require('./register')),
  verifyEmail: ctrlWrapper(require('./verifyEmail')),
  resendVerifyEmail: ctrlWrapper(require('./resendVerifyEmail')),
  login: ctrlWrapper(require('./login')),
  loginWithToken: ctrlWrapper(require('./loginWithToken')),
  getCurrentUser: ctrlWrapper(require('./getCurrentUser')),
  getById: ctrlWrapper(require('./getById')),
  logout: ctrlWrapper(require('./logout')),
  updateUser: ctrlWrapper(require('./updateUser')),
  getNewPassword: ctrlWrapper(require('./getNewPassword')),
  createNewPassword: ctrlWrapper(require('./createNewPassword')),
  getUserByRole: ctrlWrapper(require('./getUserByRole')),
};
