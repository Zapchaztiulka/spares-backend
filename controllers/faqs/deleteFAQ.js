const {
  faq: { FAQ },
} = require('../../models');
const { checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { id: questionGroupId } = req.params;
  const { faqId } = req.body;

  const existingQuestionGroup = await FAQ.findById(questionGroupId);
  await checkNotFound(existingQuestionGroup, questionGroupId, 'Question group');

  const faqToRemoveIndex = existingQuestionGroup.questions.findIndex(faq =>
    faq._id.equals(faqId),
  );
  await checkNotFound(faqToRemoveIndex !== -1, faqId, 'FAQ');

  existingQuestionGroup.questions.splice(faqToRemoveIndex, 1);

  const updatedQuestionGroup = await existingQuestionGroup.save();

  return res.status(200).json(updatedQuestionGroup);
};
