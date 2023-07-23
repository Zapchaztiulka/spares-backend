const express = require('express');

const ctrl = require('../../controllers/products');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const {
  product: { validationProduct },
} = require('../../models');

const router = express.Router();

router.get('/', ctrl.getAllProducts);

router.get('/:id', ctrl.getProductByCreator);

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
  validateBody(validationProduct),
  ctrl.updateProductById,
);

router.delete('/:id', authenticate, isValidId, ctrl.deleteProductById);

module.exports = router;
