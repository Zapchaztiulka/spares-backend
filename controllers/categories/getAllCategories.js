const {
  category: { Category },
} = require('../../models');

module.exports = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = Math.max((parseInt(page, 10) - 1) * parseInt(limit, 10), 0);

  const categories = await Category.aggregate([
    {
      $project: {
        categoryName: 1,
        icon: 1,
        subcategories: 1,
      },
    },
    {
      $sort: {
        subcategories: -1,
      },
    },
    {
      $skip: skip,
    },
    {
      // changed req.query type to number
      $limit: parseInt(limit),
    },
  ]);

  const totalCount = await Category.countDocuments();

  res.status(200).json({ totalCount, categories });
};
