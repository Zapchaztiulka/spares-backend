const express = require('express');

const ctrl = require('../../controllers/userMessages');
const {
  validateBody,
  authenticate,
  checkRequestBody,
  hasRole,
  checkPageLimit,
} = require('../../middlewares');
const { patterns } = require('../../helpers');
const {
  userMessage: { validationAddUserMessage, validationUpdateUserMessage },
} = require('../../models');

const router = express.Router();

router.get(
  '/',
  checkPageLimit,
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  ctrl.getUserMessages,
);

router.post(
  '/',
  checkRequestBody,
  validateBody(validationAddUserMessage),
  ctrl.addUserMessage,
);

router.patch(
  '/',
  checkRequestBody,
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  validateBody(validationUpdateUserMessage),
  ctrl.updateUserMessages,
);

module.exports = router;
