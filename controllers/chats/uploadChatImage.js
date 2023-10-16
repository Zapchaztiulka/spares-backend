const { HttpError } = require('../../helpers');

module.exports = async (req, res) => {
  const path = req.file?.path;

  if (!path) {
    throw HttpError(400, 'File of image is required');
  }

  return res.status(200).json({ imageURL: path });
};
