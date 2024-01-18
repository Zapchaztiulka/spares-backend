const {
  userRequest: { UserRequest },
} = require('../../models');

module.exports = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = Math.max((parseInt(page, 10) - 1) * parseInt(limit, 10), 0);

  const userRequests = await UserRequest.aggregate([
    {
      $project: {
        email: 1,
        productId: 1,
        createdAt: 1,
      },
    },
    {
      $sort: {
        createdAt: 1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: parseInt(limit),
    },
  ]);

  const totalCount = await UserRequest.countDocuments();

  res.status(200).json({ totalCount, userRequests });
};
