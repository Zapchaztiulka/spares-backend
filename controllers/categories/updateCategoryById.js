const {
  category: { Category },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  if (!req.body) {
    throw HttpError(400, 'Missing body of request');
  }

  const { role } = req.user;

  if (role !== 'admin') {
    throw HttpError(403, 'Forbidden');
  }

  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!category) {
    throw HttpError(404, 'Not found');
  }

  return res.status(200).json(category);
};
