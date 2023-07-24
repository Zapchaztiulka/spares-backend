const { ctrlWrapper } = require('../../helpers');

module.exports = {
  addCategory: ctrlWrapper(require('./addCategory')),
  updateCategoryById: ctrlWrapper(require('./updateCategoryById')),
  deleteCategoryById: ctrlWrapper(require('./deleteCategoryById')),

  getAllCategories: ctrlWrapper(require('./getAllCategories')),
  getCategoryById: ctrlWrapper(require('./getCategoryById')),
};
