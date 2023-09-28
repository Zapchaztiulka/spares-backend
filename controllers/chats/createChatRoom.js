const { isValidObjectId } = require('mongoose');
const jwt = require('jsonwebtoken');

const {
  chat: { Chat },
  user: { User },
} = require('../../models');
const { HttpError, patterns } = require('../../helpers');

require('dotenv').config();
const { SECRET_KEY } = process.env;

module.exports = async (req, res) => {
  const { userId } = req.body;

  let existingUserName = '';
  let existingUserPhone = '';

  if (userId && isValidObjectId(userId)) {
    const userById = await User.findById(userId);

    if (userById?.role && userById?.role !== patterns.roles[2]) {
      throw HttpError(
        400,
        `Only user with role "${patterns.roles[2]}" can start a chat`,
      );
    }

    if (userById) {
      existingUserPhone = userById.phone;
      existingUserName = userById.username;
    }
  }

  const welcomeMessage = {
    messageOwner: patterns.roles[0],
    message: patterns.welcomeMessage(existingUserName),
  };

  let existingChat = await Chat.findOne({ userId });

  if (existingChat && existingChat.chatStatus === patterns.chatStatus[1]) {
    existingChat = null;
  }

  if (!existingChat) {
    existingChat = await Chat.create({
      userId,
      username: existingUserName,
      userPhone: existingUserPhone,
      messages: welcomeMessage,
    });
  }

  existingChat.token = jwt.sign({ userId: existingChat.userId }, SECRET_KEY);
  await existingChat.save();

  res.status(201).json(existingChat);
};
