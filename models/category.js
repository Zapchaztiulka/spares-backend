const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  templatesMsgJoi,
  handleMongooseError,
  patterns,
} = require('../helpers');

const validationCategory = Joi.object({
  categoryName: Joi.string()
    .description('Назва категорії')
    .note('input')
    .example('Введіть назву категорії')
    .min(patterns.min.category)
    .max(patterns.max.category)
    .required()
    .messages({
      ...templatesMsgJoi('Назва категорії').commonRules,
      ...templatesMsgJoi('Назва категорії').textRules,
    }),
  icon: Joi.string()
    .description('Іконка категорії')
    .required()
    .messages({
      ...templatesMsgJoi('Іконка категорії').commonRules,
      ...templatesMsgJoi('Іконка категорії').textRules,
    }),
  subcategories: Joi.array()
    .items(
      Joi.object({
        subcategoryName: Joi.string()
          .description('Назва підкатегорії')
          .note('input')
          .example('Введіть назву підкатегорії')
          .min(patterns.min.category)
          .max(patterns.max.category)
          .required()
          .messages({
            ...templatesMsgJoi('Назва підкатегорії').commonRules,
            ...templatesMsgJoi('Назва підкатегорії').textRules,
          }),
      }),
    )
    .messages(templatesMsgJoi('Перелік субкатегорій').arrayRules),
});

const validationUpdateCategory = Joi.object({
  categoryName: Joi.string()
    .description('Назва категорії')
    .note('input')
    .example('Введіть назву категорії')
    .min(patterns.min.category)
    .max(patterns.max.category)
    .messages(templatesMsgJoi('Назва категорії').textRules),
  icon: Joi.string()
    .description('Іконка категорії')
    .required()
    .messages({
      ...templatesMsgJoi('Іконка категорії').commonRules,
      ...templatesMsgJoi('Іконка категорії').textRules,
    }),
  subcategories: Joi.array()
    .items(
      Joi.object({
        subcategoryName: Joi.string()
          .description('Назва підкатегорії')
          .note('input')
          .example('Введіть назву підкатегорії')
          .min(patterns.min.category)
          .max(patterns.max.category)
          .messages(templatesMsgJoi('Назва підкатегорії').textRules),
      }),
    )
    .messages(templatesMsgJoi('Перелік субкатегорій').arrayRules),
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
    icon: {
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
