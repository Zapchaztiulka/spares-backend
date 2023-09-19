const {
  chat: { Chat },
  user: { User },
} = require('../../models');
const { HttpError, patterns } = require('../../helpers');

module.exports = async (req, res) => {
  const { userId, userPhone, username } = req.body;
  if (!userId && !userPhone) {
    throw HttpError(
      400,
      'User phone is required if there is not user ID in request',
    );
  }

  let existingUserId = '';
  let existingUserName = '';
  let existingUserPhone = '';

  if (userId) {
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

  if (userPhone) {
    const userByPhone = await User.findOne({ phone: userPhone });

    if (userByPhone) {
      existingUserId = userByPhone._id;
      existingUserName = userByPhone.username;
    }
  }

  const welcomeMessage = {
    messageOwner: patterns.roles[0],
    message: patterns.welcomeMessage,
  };

  const newChat = await Chat.create({
    userId: existingUserId || userId,
    username: existingUserName || username,
    userPhone: existingUserPhone || userPhone,
    messages: welcomeMessage,
  });

  // Реалізувати надсилання повідомлень менеджерам через WebSocket

  res.status(201).json(newChat);
};
