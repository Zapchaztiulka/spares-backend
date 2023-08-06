const express = require('express');

const ctrl = require('../../controllers/orders');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const {
  order: { validationOrder },
} = require('../../models');

const router = express.Router();

router.post('/', authenticate, validateBody(validationOrder), ctrl.createOrder);

router.delete('/:id', authenticate, isValidId, ctrl.deleteOrder);

module.exports = router;
