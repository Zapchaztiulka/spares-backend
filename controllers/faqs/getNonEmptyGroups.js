const {
  faq: { FAQ },
} = require('../../models');

module.exports = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const NonEmptyGroups = await FAQ.find(
    { questions: { $not: { $size: 0 } } },
    '-updatedAt',
    {
      skip,
      limit,
    },
  );

  const totalCount = NonEmptyGroups.length;

  res.status(200).json({ totalCount, NonEmptyGroups });
};
