const express = require('express');

const ctrl = require('../../controllers/chats');
const {
  validateBody,
  isValidId,
  checkRequestBody,
  uploadChatImage,
} = require('../../middlewares');
const {
  chat: { validationUserId },
} = require('../../models');

const router = express.Router();

router.get('/', ctrl.getChatRoomsByStatus);

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

router.patch('/closeChatByUser/:id', isValidId, ctrl.closeChatByUser);
router.patch('/closeChatByManager/:id', isValidId, ctrl.closeChatByManager);

router.post(
  '/uploadChatImage',
  uploadChatImage.single('chatImageURL'),
  ctrl.uploadChatImage,
);

module.exports = router;
