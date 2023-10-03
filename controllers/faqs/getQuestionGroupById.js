const {
  faq: { FAQ },
} = require('../../models');
const { checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;

  const questionGroup = await FAQ.findById(id);
  await checkNotFound(questionGroup, id, 'Question group');

  res.status(200).json(questionGroup);
};
