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

// for question groups
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

// for FAQ in their groups
router.get('/faq/:id', isValidId, ctrl.getFAQByGroupId);

router.post(
  '/faq/:id',
  checkRequestBody,
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  isValidId,
  validateBody(validationAddFAQ),
  ctrl.addFAQ,
);

router.patch(
  '/faq/:id',
  checkRequestBody,
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  isValidId,
  validateBody(validationUpdateFAQ),
  ctrl.updateFAQ,
);

router.delete(
  '/faq/:id',
  checkRequestBody,
  authenticate,
  hasRole([patterns.roles[0], patterns.roles[1]]),
  isValidId,
  ctrl.deleteFAQ,
);

module.exports = router;
