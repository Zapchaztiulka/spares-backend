const {
  faq: { FAQ },
} = require('../../models');
const { checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;
  const questionGroup = await FAQ.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  await checkNotFound(questionGroup, id, 'Question group');

  return res.status(200).json(questionGroup);
};
