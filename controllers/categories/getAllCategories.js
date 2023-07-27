const {
  category: { Category },
} = require('../../models');

module.exports = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const categories = await Category.find({}, '-updatedAt', {
    skip,
    limit,
  });

  const totalCount = categories.length;

  res.status(200).json({ totalCount, categories });
};
