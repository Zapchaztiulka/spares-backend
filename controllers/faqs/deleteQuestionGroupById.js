const {
  faq: { FAQ },
} = require('../../models');
const { checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;

  const questionGroup = await FAQ.findByIdAndDelete(id);
  await checkNotFound(questionGroup, id, 'Question group');

  return res
    .status(204)
    .json({ message: `Question group by ID:${id} was deleted` });
};
