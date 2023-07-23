const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const { HttpError } = require('../helpers');

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const allowedFormats = ['jpg', 'jpeg', 'png'];

const storage = new CloudinaryStorage({
  cloudinary,
  folder: 'avatarURL',
  allowedFormats,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

module.exports = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!allowedFormats.includes(file.mimetype.split('/')[1])) {
      cb(
        new Error(
          'Invalid avatar file format. Only JPG, JPEG, PNG files are allowed',
        ),
      );
    } else {
      cb(null, true);
    }
  },
});
