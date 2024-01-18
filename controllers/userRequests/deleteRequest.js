const {
  userRequest: { UserRequest },
} = require('../../models');
const { checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;

  const userRequest = await UserRequest.findByIdAndDelete(id);
  await checkNotFound(userRequest, id, 'User request');

  return res.status(204).json();
};
