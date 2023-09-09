const express = require('express');

const ctrl = require('../../controllers/categories');
const {
  authenticate,
  validateBody,
  isValidId,
  hasRole,
  checkAccess,
  checkRequestBody,
} = require('../../middlewares');
const {
  category: { validationCategory, validationUpdateCategory },
} = require('../../models');
const { patterns } = require('../../helpers');

const router = express.Router();

router.get('/', ctrl.getAllCategories);
router.get('/:id', isValidId, ctrl.getCategoryById);

router.post(
  '/',
  checkRequestBody,
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  validateBody(validationCategory),
  ctrl.addCategory,
);

router.patch(
  '/:id',
  checkRequestBody,
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  checkAccess('updateCategoryAccess', 'Оновлення категорії товару'),
  isValidId,
  validateBody(validationUpdateCategory),
  ctrl.updateCategoryById,
);

router.delete(
  '/:id',
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  checkAccess('deleteCategoryAccess', 'Видалення категорії товару'),
  isValidId,
  ctrl.deleteCategoryById,
);

module.exports = router;
