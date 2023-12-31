const {
  faq: { FAQ },
} = require('../../models');
const { checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: questionGroupId } = req.params;
  const faqs = req.body;

  const existingQuestionGroup = await FAQ.findById(questionGroupId);
  await checkNotFound(existingQuestionGroup, questionGroupId, 'Question group');

  const faqsWithCreator = faqs.map(faq => ({
    ...faq,
    creator: userId,
  }));

  existingQuestionGroup.questions.push(...faqsWithCreator);

  const updatedQuestionGroup = await existingQuestionGroup.save();

  return res.status(201).json(updatedQuestionGroup);
};
