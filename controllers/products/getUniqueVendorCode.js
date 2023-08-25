const {
  product: { Product },
} = require('../../models');

module.exports = async (req, res) => {
  const { vendorCode } = req.params;

  const existingProduct = await Product.findOne({ vendorCode });

  if (existingProduct) {
    return res.status(409).json({ isUnique: false, product: existingProduct });
  }

  return res.status(200).json({ isUnique: true });
};
