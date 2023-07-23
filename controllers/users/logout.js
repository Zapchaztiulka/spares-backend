const {
  user: { User },
} = require('../../models');

module.exports = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });
  res.status(204).json();
};
