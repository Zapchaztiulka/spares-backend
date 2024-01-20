const express = require('express');

const ctrl = require('../../controllers/userRequests');
const {
  validateBody,
  isValidId,
  checkRequestBody,
  checkPageLimit,
} = require('../../middlewares');
const {
  userRequest: { validationRequest },
} = require('../../models');

const router = express.Router();

router.get('/', checkPageLimit, ctrl.getRequests);

router.post(
  '/',
  checkRequestBody,
  validateBody(validationRequest),
  ctrl.addRequest,
);

router.delete('/:id', isValidId, ctrl.deleteRequest);

module.exports = router;
