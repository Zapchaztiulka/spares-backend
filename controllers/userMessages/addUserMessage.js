const {
  userMessage: { UserMessage },
} = require('../../models');

module.exports = async (req, res) => {
  const newUserMessage = await UserMessage.create(req.body);

  return res.status(201).json(newUserMessage);
};
