const express = require('express');

const ctrl = require('../../controllers/categories');
const {
  authenticate,
  validateBody,
  isValidId,
  hasRole,
} = require('../../middlewares');
const {
  category: { validationCategory, validationUpdateCategory },
} = require('../../models');

const router = express.Router();

router.get('/', ctrl.getAllCategories);

router.get('/:id', ctrl.getCategoryById);

router.post(
  '/',
  authenticate,
  hasRole('admin'),
  validateBody(validationCategory),
  ctrl.addCategory,
);

router.patch(
  '/:id',
  authenticate,
  hasRole('admin'),
  isValidId,
  validateBody(validationUpdateCategory),
  ctrl.updateCategoryById,
);

router.delete(
  '/:id',
  authenticate,
  hasRole('admin'),
  isValidId,
  ctrl.deleteCategoryById,
);

module.exports = router;
