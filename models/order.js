const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  handleMongooseError,
  templatesMsgJoi,
  patterns,
} = require('../helpers');

const validationOrderByUser = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string()
          .length(24)
          .required()
          .messages(templatesMsgJoi('Product ID').commonRules),
        quantity: Joi.number()
          .min(patterns.min.quantity)
          .max(patterns.max.quantity)
          .messages({
            ...templatesMsgJoi('Quantity').numberRules,
            ...templatesMsgJoi('Quantity').integerNumberRules,
            ...templatesMsgJoi('Quantity').commonRules,
          }),
      }),
    )
    .required()
    .messages({
      ...templatesMsgJoi('Products array in order').arrayRules,
      ...templatesMsgJoi('Products array in order').commonRules,
    }),
  adminTag: Joi.string()
    .description('AdminTag')
    .note('input')
    .example('Введіть adminTag')
    .allow('')
    .min(patterns.min.adminTag)
    .max(patterns.max.adminTag)
    .messages(templatesMsgJoi('AdminTag').textRules),
});

const validationOrderByAny = Joi.object({
  phone: Joi.string()
    .pattern(patterns.phonePattern)
    .messages(
      templatesMsgJoi('Phone', patterns.phonePatternMessage).regExpRules,
    ),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .messages(templatesMsgJoi('Email').emailRules),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string()
          .length(24)
          .required()
          .messages(templatesMsgJoi('Product ID').commonRules),
        quantity: Joi.number()
          .min(patterns.min.quantity)
          .max(patterns.max.quantity)
          .messages({
            ...templatesMsgJoi('Quantity').numberRules,
            ...templatesMsgJoi('Quantity').integerNumberRules,
            ...templatesMsgJoi('Quantity').commonRules,
          }),
      }),
    )
    .required()
    .messages({
      ...templatesMsgJoi('Products array in order').arrayRules,
      ...templatesMsgJoi('Products array in order').commonRules,
    }),
  adminTag: Joi.string()
    .description('AdminTag')
    .note('input')
    .example('Введіть adminTag')
    .allow('')
    .min(patterns.min.adminTag)
    .max(patterns.max.adminTag)
    .messages(templatesMsgJoi('AdminTag').textRules),
});

const validationUpdateOrder = Joi.object({
  status: Joi.string()
    .valid(...patterns.orderStatus)
    .required()
    .messages({
      ...templatesMsgJoi('Status', patterns.orderStatus).enumRules,
      ...templatesMsgJoi('Status').commonRules,
    }),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string()
          .length(24)
          .required()
          .messages(templatesMsgJoi('Product ID').commonRules),
        quantity: Joi.number()
          .min(patterns.min.quantity)
          .max(patterns.max.quantity)
          .messages({
            ...templatesMsgJoi('Quantity').numberRules,
            ...templatesMsgJoi('Quantity').integerNumberRules,
            ...templatesMsgJoi('Quantity').commonRules,
          }),
      }),
    )
    .min(1)
    .required()
    .messages({
      ...templatesMsgJoi('Products array in order').arrayRules,
      ...templatesMsgJoi('Products array in order').commonRules,
    }),
  adminTag: Joi.string()
    .description('AdminTag')
    .note('input')
    .example('Введіть adminTag')
    .allow('')
    .min(patterns.min.adminTag)
    .max(patterns.max.adminTag)
    .messages(templatesMsgJoi('AdminTag').textRules),
});

const validationAdminTag = Joi.object({
  adminTag: Joi.string()
    .description('AdminTag')
    .note('input')
    .example('Введіть adminTag')
    .required()
    .min(patterns.min.adminTag)
    .max(patterns.max.adminTag)
    .messages({
      ...templatesMsgJoi('AdminTag').textRules,
      ...templatesMsgJoi('AdminTag').commonRules,
    }),
  phone: Joi.string()
    .description('Телефон')
    .note('input')
    .example('Введіть телефон користувача')
    .pattern(patterns.phonePattern)
    .messages(
      templatesMsgJoi('Телефон', patterns.phonePatternMessage).regExpRules,
    ),
});

const orderProductSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    name: {
      type: String,
    },
    vendorCode: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    units: {
      type: String,
      enum: patterns.units,
      default: 'шт',
    },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    username: {
      type: String,
      default: '',
    },
    userSurname: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    products: [orderProductSchema],
    status: {
      type: String,
      enum: patterns.orderStatus,
      default: 'в обробці',
    },
    totalTypeOfProducts: {
      type: Number,
      default: 0,
    },
    totalProducts: {
      type: Number,
      default: 0,
    },
    adminTag: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true },
);

orderSchema.post('save', handleMongooseError);
const Order = model('order', orderSchema);

module.exports = {
  Order,
  validationOrderByUser,
  validationOrderByAny,
  validationUpdateOrder,
  validationAdminTag,
};
