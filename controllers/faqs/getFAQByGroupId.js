const {
  faq: { FAQ },
} = require('../../models');
const { HttpError, checkNotFound } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { isShow } = req.query;

  const questionGroup = await FAQ.findById(id);
  await checkNotFound(questionGroup, id, 'Question group');

  let questions = [];
  if (isShow === undefined) {
    questions = questionGroup.questions;
  } else if (isShow === 'false') {
    questions = questionGroup.questions.filter(
      question => question.isShowInChat === Boolean(!isShow),
    );
  } else if (isShow === 'true') {
    questions = questionGroup.questions.filter(
      question => question.isShowInChat === Boolean(isShow),
    );
  } else {
    throw HttpError(400, 'Parameter "isShow" must be only "true" or "false"');
  }

  const totalCount = questions.length;

  res.status(200).json({ totalCount, questions });
};
