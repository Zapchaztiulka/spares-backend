const express = require('express');

const ctrl = require('../../controllers/orders');
const {
  authenticate,
  validateBody,
  isValidId,
  hasRole,
} = require('../../middlewares');
const {
  order: { validationOrderByUser, validationOrderByAny },
} = require('../../models');

const router = express.Router();

router.post(
  '/',
  authenticate,
  hasRole('user'),
  validateBody(validationOrderByUser),
  ctrl.createOrderbyUser,
);
router.post('/any', validateBody(validationOrderByAny), ctrl.createOrderbyAny);

router.delete(
  '/:id',
  authenticate,
  hasRole('user'),
  isValidId,
  ctrl.deleteOrderbyUser,
);
router.delete('/any/:id', isValidId, ctrl.deleteOrderbyAny);

module.exports = router;
