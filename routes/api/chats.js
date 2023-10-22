const express = require('express');

const ctrl = require('../../controllers/chats');
const {
  authenticate,
  validateBody,
  isValidId,
  hasRole,
  checkAccess,
  checkRequestBody,
  uploadChatImage,
} = require('../../middlewares');
const {
  chat: { validationUserId, validationAddMessage, validationConnectManager },
} = require('../../models');
const { patterns } = require('../../helpers');

const router = express.Router();

router.get('/', ctrl.getChatRoomsByStatus);
router.get(
  '/chatRoom/:id',
  checkRequestBody,
  isValidId,
  validateBody(validationUserId),
  ctrl.getChatRoomById,
);

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

router.post(
  '/uploadChatImage',
  uploadChatImage.single('chatImageURL'),
  ctrl.uploadChatImage,
);

// router.delete(
//   '/:id',
//   authenticate,
//   isValidId,
//   ctrl.deleteCategoryById,
// );

module.exports = router;
