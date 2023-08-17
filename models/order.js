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
          .messages(templatesMsgJoi('Product Id')),
        quantity: Joi.number().messages(
          templatesMsgJoi('Quantity of ordered products'),
        ),
      }),
    )
    .required()
    .messages(templatesMsgJoi('Products')),
});

const validationOrderByAny = Joi.object({
  phone: Joi.string()
    .pattern(patterns.phonePattern)
    .required()
    .messages(templatesMsgJoi('Phone')),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .messages(templatesMsgJoi('Email')),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string()
          .length(24)
          .required()
          .messages(templatesMsgJoi('Product Id')),
        quantity: Joi.number().messages(
          templatesMsgJoi('Quantity of ordered products'),
        ),
      }),
    )
    .required()
    .messages(templatesMsgJoi('Products')),
});

const validationUpdateOrder = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string()
          .length(24)
          .messages(templatesMsgJoi('Product Id')),
        quantity: Joi.number().messages(
          templatesMsgJoi('Quantity of ordered products'),
        ),
      }),
    )
    .messages(templatesMsgJoi('Products')),
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
