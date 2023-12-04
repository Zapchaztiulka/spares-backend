const express = require('express');

const ctrl = require('../../controllers/orders');
const {
  authenticate,
  validateBody,
  isValidId,
  hasRole,
  checkRequestBody,
  checkPageLimit,
} = require('../../middlewares');
const {
  order: {
    validationOrderByUser,
    validationOrderByAny,
    validationUpdateOrder,
    validationAdminTag,
  },
} = require('../../models');
const { patterns } = require('../../helpers');

const router = express.Router();

router.get(
  '/',
  // authenticate,
  // hasRole([patterns.roles[0], patterns.roles[1]]),
  checkPageLimit,
  ctrl.getAllOrders,
);
router.get('/own', authenticate, ctrl.getUserOrders); // for getting user's orders
router.get('/user/:id', authenticate, isValidId, ctrl.getUserOrders); // for getting user's orders by admin
router.get(
  '/:id',
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  isValidId,
  ctrl.getOrderDetails,
);
router.get(
  '/admin-tag/get-orders',
  validateBody(validationAdminTag),
  ctrl.getOrdersByAdminTag,
);
router.get(
  '/admin-tag/get-orders',
  validateBody(validationAdminTag),
  ctrl.getOrdersByAdminTag,
);

router.post(
  '/',
  checkRequestBody,
  authenticate,
  hasRole(patterns.roles[2]),
  validateBody(validationOrderByUser),
  ctrl.createOrderbyUser,
);
router.post(
  '/any',
  checkRequestBody,
  validateBody(validationOrderByAny),
  ctrl.createOrderbyAny,
);
router.post(
  '/assign-admin-tag',
  checkRequestBody,
  validateBody(validationAdminTag),
  ctrl.assignAdminTagByPhone,
);
router.post(
  '/assign-admin-tag/:id',
  checkRequestBody,
  isValidId,
  validateBody(validationAdminTag),
  ctrl.assignAdminTagById,
);

router.put(
  '/:id',
  checkRequestBody,
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  isValidId,
  validateBody(validationUpdateOrder),
  ctrl.updateOrder,
);

router.delete(
  '/:id',
  authenticate,
  hasRole(patterns.roles[2]),
  isValidId,
  ctrl.deleteOrderbyUser,
);
router.delete('/any/:id', isValidId, ctrl.deleteOrderbyAny);

module.exports = router;
