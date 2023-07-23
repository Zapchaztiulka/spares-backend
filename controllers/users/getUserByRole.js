const {
  user: { User },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { role } = req.params;
  const users = await User.find({ role });

  if (!users) {
    throw HttpError(404, `Users with role ${role} not found`);
  }

  res.status(200).json({ users });
};
