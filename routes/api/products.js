const express = require('express');

const ctrl = require('../../controllers/products');
const {
  authenticate,
  validateBody,
  isValidId,
  hasRole,
  checkAccess,
  checkRequestBody,
  checkPageLimit,
  uploadFile,
} = require('../../middlewares');
const {
  product: {
    validationAddProducts,
    validationUpdateProduct,
    validationProductIdsArray,
    validationBodyQuery,
  },
} = require('../../models');
const { patterns } = require('../../helpers');

const router = express.Router();

router.get(
  '/',
  checkPageLimit,
  validateBody(validationBodyQuery),
  ctrl.getProductsByQuery,
);
router.get('/:id', isValidId, ctrl.getProductById);
router.get('/vendorCode/:vendorCode', ctrl.getUniqueVendorCode);
router.get('/filters/by-product-name', ctrl.getCountriesTrademarksPrices);

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
  validateBody(validationProductIdsArray),
  ctrl.updatePriceDates,
);

router.delete(
  '/',
  checkRequestBody,
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  checkAccess('deleteProductAccess', 'Видалення товару'),
  validateBody(validationProductIdsArray),
  ctrl.deleteProducts,
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
