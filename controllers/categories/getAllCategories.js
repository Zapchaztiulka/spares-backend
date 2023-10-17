const {
  category: { Category },
} = require('../../models');

module.exports = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const categories = await Category.aggregate([
    {
      $project: {
        categoryName: 1,
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
      $limit: limit,
    },
  ]);

  const totalCount = await Category.countDocuments();

  res.status(200).json({ totalCount, categories });
};
