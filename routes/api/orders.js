const express = require('express');

const ctrl = require('../../controllers/orders');
const {
  authenticate,
  validateBody,
  isValidId,
  hasRole,
} = require('../../middlewares');
const {
  order: {
    validationOrderByUser,
    validationOrderByAny,
    validationUpdateOrder,
    validationAdminTag,
  },
} = require('../../models');

const router = express.Router();

router.get('/', authenticate, hasRole('admin'), ctrl.getAllOrders);
router.get('/own', authenticate, ctrl.getUserOrders); // for getting user's orders
router.get('/user/:id', authenticate, isValidId, ctrl.getUserOrders); // for getting user's orders by admin
router.get(
  '/:id',
  authenticate,
  hasRole('admin'),
  isValidId,
  ctrl.getOrderDetails,
);
router.get(
  '/admin-tag/get-orders',
  validateBody(validationAdminTag),
  ctrl.getOrdersByAdminTag,
);

router.post(
  '/',
  authenticate,
  hasRole('user'),
  validateBody(validationOrderByUser),
  ctrl.createOrderbyUser,
);
router.post('/any', validateBody(validationOrderByAny), ctrl.createOrderbyAny);
router.post(
  '/assign-admin-tag',
  validateBody(validationAdminTag),
  ctrl.assignAdminTagByPhone,
);
router.post(
  '/assign-admin-tag/:id',
  isValidId,
  validateBody(validationAdminTag),
  ctrl.assignAdminTagById,
);

router.put(
  '/:id',
  authenticate,
  hasRole('admin'),
  isValidId,
  validateBody(validationUpdateOrder),
  ctrl.updateOrder,
);

router.delete(
  '/:id',
  authenticate,
  hasRole('user'),
  isValidId,
  ctrl.deleteOrderbyUser,
);
router.delete('/any/:id', isValidId, ctrl.deleteOrderbyAny);

module.exports = router;
