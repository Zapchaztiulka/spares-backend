const { ctrlWrapper } = require('../../helpers');

module.exports = {
  getNonEmptyGroups: ctrlWrapper(require('./getNonEmptyGroups')),
  getQuestionGroupById: ctrlWrapper(require('./getQuestionGroupById')),
  addQuestionGroup: ctrlWrapper(require('./addQuestionGroup')),
  updateQuestionGroupById: ctrlWrapper(require('./updateQuestionGroupById')),
  deleteQuestionGroupById: ctrlWrapper(require('./deleteQuestionGroupById')),

  getFAQByGroupId: ctrlWrapper(require('./getFAQByGroupId')),
  addFAQ: ctrlWrapper(require('./addFAQ')),
  updateFAQ: ctrlWrapper(require('./updateFAQ')),
  deleteFAQ: ctrlWrapper(require('./deleteFAQ')),
};
