const express = require('express');

const ctrl = require('../../controllers/categories');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const {
  category: { validationCategory },
} = require('../../models');

const router = express.Router();

router.get('/', ctrl.getAllCategories);

router.get('/:id', ctrl.getCategoryById);

router.post(
  '/',
  authenticate,
  validateBody(validationCategory),
  ctrl.addCategory,
);

router.patch(
  '/:id',
  authenticate,
  isValidId,
  validateBody(validationCategory),
  ctrl.updateCategoryById,
);

router.delete('/:id', authenticate, isValidId, ctrl.deleteCategoryById);

module.exports = router;
