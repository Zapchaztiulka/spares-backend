const {
  faq: { FAQ },
} = require('../../models');
const { checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { _id: userId } = req.user;
  const { _id: questionGroupId } = req.params;
  const faqs = req.body;

  const existingQuestionGroup = await FAQ.findById(questionGroupId);
  await checkNotFound(existingQuestionGroup, questionGroupId, 'Question group');

  existingQuestionGroup.questions.push({ ...faqs, creator: userId });

  const updatedQuestionGroup = await existingQuestionGroup.save();

  return res.status(201).json(updatedQuestionGroup);
};
