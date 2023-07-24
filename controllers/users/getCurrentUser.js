module.exports = async (req, res) => {
  const { _id, username, userSurname, email, role, token } = req.user;

  res.status(200).json({
    id: _id,
    username,
    userSurname,
    email,
    role,
    token,
  });
};
