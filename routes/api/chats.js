const express = require('express');

const ctrl = require('../../controllers/chats');
const {
  authenticate,
  validateBody,
  isValidId,
  hasRole,
  checkAccess,
  checkRequestBody,
} = require('../../middlewares');
const {
  chat: { validationUserId },
} = require('../../models');
const { patterns } = require('../../helpers');

const router = express.Router();

// router.get('/', ctrl.getAllCategories);
// router.get('/:id', isValidId, ctrl.getCategoryById);

router.post(
  '/auth',
  checkRequestBody,
  validateBody(validationUserId),
  ctrl.authUser,
);

router.post(
  '/chatRoom',
  checkRequestBody,
  validateBody(validationUserId),
  ctrl.createChatRoom,
);

router.patch('/chatRoom/:id', isValidId, ctrl.closeChatRoom);

// router.delete(
//   '/:id',
//   authenticate,
//   hasRole([patterns.roles[0], patterns.roles[1]]),
//   checkAccess('deleteCategoryAccess', 'Видалення категорії товару'),
//   isValidId,
//   ctrl.deleteCategoryById,
// );

module.exports = router;
