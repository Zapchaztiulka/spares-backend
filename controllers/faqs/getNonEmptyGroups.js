const {
  faq: { FAQ },
} = require('../../models');

module.exports = async (req, res) => {
  const { page = 1, limit = 10, isShow } = req.query;
  const skip = (page - 1) * limit;

  const filter = { questions: { $not: { $size: 0 } } };

  if (isShow !== undefined) {
    filter.isShowInChat = isShow;
  }

  const questionGroups = await FAQ.find(filter, '-updatedAt', {
    skip,
    limit,
  });

  const totalCount = questionGroups.length;

  res.status(200).json({ totalCount, questionGroups });
};
