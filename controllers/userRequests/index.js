const { ctrlWrapper } = require('../../helpers');

module.exports = {
  getRequests: ctrlWrapper(require('./getRequests')),
  addRequest: ctrlWrapper(require('./addRequest')),
  deleteRequest: ctrlWrapper(require('./deleteRequest')),
};
