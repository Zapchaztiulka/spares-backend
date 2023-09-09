module.exports = async (req, res) => {
  const { _id, username, userSurname, email, phone, role, access, token } =
    req.user;

  res.status(200).json({
    id: _id,
    username,
    userSurname,
    email,
    phone,
    role,
    access,
    token,
  });
};
