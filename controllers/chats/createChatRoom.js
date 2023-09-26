const { isValidObjectId } = require('mongoose');

const {
  chat: { Chat },
  user: { User },
} = require('../../models');
const { HttpError, patterns } = require('../../helpers');

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

  const newChat = await Chat.create({
    userId,
    username: existingUserName,
    userPhone: existingUserPhone,
    messages: welcomeMessage,
  });

  // Реалізувати надсилання повідомлень менеджерам через WebSocket

  res.status(201).json(newChat);
};
