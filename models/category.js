const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { nanoid } = require('nanoid');

const { templatesMsgJoi, handleMongooseError } = require('../helpers');

const validationCategory = Joi.object({
  categoryName: Joi.string()
    .required()
    .messages(templatesMsgJoi('Category name')),
  subcategory: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      subcategoryName: Joi.string(),
    }),
  ),
});

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    subcategory: [
      {
        id: {
          type: String,
          default: () => nanoid(8),
        },
        subcategoryName: {
          type: String,
          required: true,
        },
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

categorySchema.post('save', handleMongooseError);
const Category = model('category', categorySchema);

module.exports = {
  Category,
  validationCategory,
};
