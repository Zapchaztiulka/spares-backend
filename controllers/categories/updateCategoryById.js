const {
  category: { Category },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!category) {
    throw HttpError(404, `Category with ID ${id} not found`);
  }

  return res.status(200).json(category);
};
