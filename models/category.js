const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { templatesMsgJoi, handleMongooseError } = require('../helpers');

const validationCategory = Joi.object({
  categoryName: Joi.string()
    .required()
    .messages(templatesMsgJoi('Category name')),
  subcategories: Joi.array().items(
    Joi.object({
      subcategoryName: Joi.string().required(),
    }),
  ),
});

const validationUpdateCategory = Joi.object({
  categoryName: Joi.string().messages(templatesMsgJoi('Category name')),
  subcategories: Joi.array().items(
    Joi.object({
      subcategoryName: Joi.string(),
    }),
  ),
});

const subcategorySchema = new Schema({
  subcategoryName: {
    type: String,
    required: true,
  },
});

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    subcategories: [subcategorySchema],
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
  validationUpdateCategory,
};
