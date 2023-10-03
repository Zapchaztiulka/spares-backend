const {
  faq: { FAQ },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { _id } = req.user;
  const { questionGroup } = req.body;
  const pureQuestionGroup = questionGroup.trim();

  const existedQuestionGroup = await FAQ.findOne({
    questionGroup: pureQuestionGroup,
  });
  if (existedQuestionGroup) {
    throw HttpError(
      409,
      `Question group: ${existedQuestionGroup} has already existed`,
    );
  }

  const newQuestionGroup = await FAQ.create({
    ...req.body,
    creator: _id,
  });

  return res.status(201).json(newQuestionGroup);
};
