const express = require('express');

const ctrl = require('../../controllers/products');
const {
  authenticate,
  validateBody,
  isValidId,
  hasRole,
  checkAccess,
  checkRequestBody,
  uploadFile,
} = require('../../middlewares');
const {
  product: {
    validationAddProducts,
    validationUpdateProduct,
    validationUpdatePriceDates,
  },
} = require('../../models');
const { patterns } = require('../../helpers');

const router = express.Router();

router.get('/', ctrl.getProductsByQuery);
router.get('/:id', isValidId, ctrl.getProductById);
router.get('/vendorCode/:vendorCode', ctrl.getUniqueVendorCode);

router.post(
  '/upload',
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  uploadFile.single('file'),
  ctrl.uploadProducts,
);
router.post(
  '/',
  checkRequestBody,
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  validateBody(validationAddProducts),
  ctrl.addProducts,
);

router.patch(
  '/:id',
  checkRequestBody,
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  checkAccess('updateProductAccess', 'Оновлення товару'),
  isValidId,
  validateBody(validationUpdateProduct),
  ctrl.updateProductById,
);

router.patch(
  '/update/price-dates',
  checkRequestBody,
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  checkAccess('updateProductAccess', 'Оновлення товару'),
  validateBody(validationUpdatePriceDates),
  ctrl.updatePriceDates,
);

router.delete(
  '/:id',
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  checkAccess('deleteProductAccess', 'Видалення товару'),
  isValidId,
  ctrl.deleteProductById,
);

module.exports = router;
