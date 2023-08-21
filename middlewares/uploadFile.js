const multer = require('multer');

const { generateUniqueFileName } = require('../helpers/productHelpers');

module.exports = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueFileName = generateUniqueFileName(file.originalname);
      cb(null, uniqueFileName);
    },
  }),
});
