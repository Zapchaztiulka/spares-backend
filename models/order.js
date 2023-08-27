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
          .min(1)
          .max(1000)
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
    .required()
    .messages({
      ...templatesMsgJoi('Email').emailRules,
      ...templatesMsgJoi('Email').commonRules,
    }),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string()
          .length(24)
          .required()
          .messages(templatesMsgJoi('Product ID').commonRules),
        quantity: Joi.number()
          .min(1)
          .max(1000)
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
          .min(1)
          .max(1000)
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
});

const orderProductSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  name: {
    type: String,
  },
  manufactureId: {
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
});

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
};
