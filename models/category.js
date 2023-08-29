const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  templatesMsgJoi,
  handleMongooseError,
  patterns,
} = require('../helpers');

const validationCategory = Joi.object({
  categoryName: Joi.string()
    .min(patterns.min.category)
    .max(patterns.max.category)
    .required()
    .messages({
      ...templatesMsgJoi('Category name').commonRules,
      ...templatesMsgJoi('Category name').textRules,
    }),
  subcategories: Joi.array()
    .items(
      Joi.object({
        subcategoryName: Joi.string()
          .min(patterns.min.category)
          .max(patterns.max.category)
          .required()
          .messages({
            ...templatesMsgJoi('Subcategory name').commonRules,
            ...templatesMsgJoi('Subcategory name').textRules,
          }),
      }),
    )
    .messages(templatesMsgJoi('Subcategories').arrayRules),
});

const validationUpdateCategory = Joi.object({
  categoryName: Joi.string()
    .min(patterns.min.category)
    .max(patterns.max.category)
    .messages(templatesMsgJoi('Category name').textRules),
  subcategories: Joi.array()
    .items(
      Joi.object({
        subcategoryName: Joi.string()
          .min(patterns.min.category)
          .max(patterns.max.category)
          .messages(templatesMsgJoi('Subcategory name').textRules),
      }),
    )
    .messages(templatesMsgJoi('Subcategories').arrayRules),
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
