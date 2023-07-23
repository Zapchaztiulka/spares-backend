module.exports = async (req, res) => {
  const { _id, avatarURL, username, email, birthday, phone, skype, token } =
    req.user;
  res.status(200).json({
    data: {
      id: _id,
      avatarURL,
      username,
      email,
      birthday,
      phone,
      skype,
      token,
    },
  });
};
