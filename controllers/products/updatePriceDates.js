const {
  product: { Product },
} = require('../../models');
const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const { productIds } = req.body;

  const foundProducts = await Product.find({ _id: { $in: productIds } });

  const foundProductIds = foundProducts.map(product => product._id.toString());
  const notFoundProductIds = productIds.filter(
    productId => !foundProductIds.includes(productId),
  );

  if (notFoundProductIds.length === 0) {
    const updateResult = await Product.updateMany(
      { _id: { $in: foundProductIds } },
      { 'price.updatedAt': new Date() },
    );

    const { modifiedCount } = updateResult;
    if (modifiedCount > 0) {
      return res.status(200).json({
        message: `Дати перевірки цін по ${modifiedCount} товарам успішно оновлені`,
      });
    }
  } else {
    throw HttpError(
      404,
      `Товари з ID ${notFoundProductIds.join(', ')} не були знайдені`,
    );
  }
};
