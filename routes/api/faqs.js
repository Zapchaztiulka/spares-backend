const express = require('express');

const ctrl = require('../../controllers/faqs');
const {
  authenticate,
  validateBody,
  isValidId,
  hasRole,
  checkRequestBody,
} = require('../../middlewares');
const {
  faq: {
    validationAddQuestionGroup,
    validationUpdateQuestionGroup,
    validationAddFAQ,
    validationUpdateFAQ,
  },
} = require('../../models');
const { patterns } = require('../../helpers');

const router = express.Router();

router.get('/', ctrl.getNonEmptyGroups);
router.get('/:id', isValidId, ctrl.getQuestionGroupById);

router.post(
  '/',
  checkRequestBody,
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  validateBody(validationAddQuestionGroup),
  ctrl.addQuestionGroup,
);

router.post(
  '/faq/:id',
  checkRequestBody,
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  isValidId,
  validateBody(validationAddFAQ),
  ctrl.addQuestionGroup,
);

router.patch(
  '/:id',
  checkRequestBody,
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  isValidId,
  validateBody(validationUpdateQuestionGroup),
  ctrl.updateQuestionGroupById,
);

router.delete(
  '/:id',
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  isValidId,
  ctrl.deleteQuestionGroupById,
);

module.exports = router;
