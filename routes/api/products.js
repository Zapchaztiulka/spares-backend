const express = require('express');

const ctrl = require('../../controllers/products');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const {
  product: { validationProduct, validationUpdateProduct },
} = require('../../models');

const router = express.Router();

router.get('/', ctrl.getProductsByQuery);

router.get('/:id', ctrl.getProductById);

router.post(
  '/',
  authenticate,
  validateBody(validationProduct),
  ctrl.addProduct,
);

router.patch(
  '/:id',
  authenticate,
  isValidId,
  validateBody(validationUpdateProduct),
  ctrl.updateProductById,
);

router.delete('/:id', authenticate, isValidId, ctrl.deleteProductById);

module.exports = router;
