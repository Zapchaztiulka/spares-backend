const {
  user: { User },
} = require('../../models');

const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { id, avatarURL: oldAvatar } = req.user;

  if (!req.body) throw new HttpError({ message: 'Missing field' });

  const user = await User.findByIdAndUpdate(id, {
    ...req.body,
    avatarURL: req?.file?.path || oldAvatar,
  });

  if (!user) throw new HttpError('User not found');

  const updatedUser = await User.findById(id);
  const { username, email, phone, avatarURL, skype, birthday } = updatedUser;

  reviewsUpd(id, username, avatarURL);

  res.status(200).json({
    data: {
      username,
      email,
      phone,
      avatarURL,
      skype,
      birthday,
    },
    message: `User with ID: ${id} was updated`,
  });
};
