const express = require('express');

const ctrl = require('../../controllers/products');
const {
  authenticate,
  validateBody,
  isValidId,
  hasRole,
} = require('../../middlewares');
const {
  product: { validationProduct, validationUpdateProduct },
} = require('../../models');

const router = express.Router();

router.get('/', ctrl.getProductsByQuery);

router.get('/:id', ctrl.getProductById);

router.post(
  '/',
  authenticate,
  hasRole('admin'),
  validateBody(validationProduct),
  ctrl.addProduct,
);

router.patch(
  '/:id',
  authenticate,
  hasRole('admin'),
  isValidId,
  validateBody(validationUpdateProduct),
  ctrl.updateProductById,
);

router.delete(
  '/:id',
  authenticate,
  hasRole('admin'),
  isValidId,
  ctrl.deleteProductById,
);

module.exports = router;
