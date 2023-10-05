const {
  faq: { FAQ },
} = require('../../models');
const { checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: questionGroupId } = req.params;
  const { faqId, question, answer, answerImages, isShowInChat } = req.body;

  const existingQuestionGroup = await FAQ.findById(questionGroupId);
  await checkNotFound(existingQuestionGroup, questionGroupId, 'Question group');

  const faqToUpdate = existingQuestionGroup.questions.find(faq =>
    faq._id.equals(faqId),
  );
  await checkNotFound(faqToUpdate, faqId, 'FAQ');

  if (question) {
    faqToUpdate.question = question;
    faqToUpdate.creator = userId;
  }

  if (answer) {
    faqToUpdate.answer = answer;
    faqToUpdate.creator = userId;
  }

  if (answerImages) {
    faqToUpdate.answerImages = answerImages;
    faqToUpdate.creator = userId;
  }

  if (isShowInChat !== undefined) {
    faqToUpdate.isShowInChat = isShowInChat;
    faqToUpdate.creator = userId;
  }

  const updatedQuestionGroup = await existingQuestionGroup.save();

  return res.status(200).json(updatedQuestionGroup);
};
