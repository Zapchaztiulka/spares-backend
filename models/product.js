const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { nanoid } = require('nanoid');

const {
  templatesMsgJoi,
  handleMongooseError,
  patterns,
} = require('../helpers');

const validationProduct = Joi.object({
  name: Joi.string().required().messages(templatesMsgJoi('Product name')),
  manufactureId: Joi.string()
    .required()
    .messages(templatesMsgJoi('Manufacture Id')),
  price: Joi.number().min(0).required().messages(templatesMsgJoi('Price')),
  availability: Joi.string()
    .valid(...patterns.availability)
    .required()
    .messages(templatesMsgJoi('Availability')),
  weight: Joi.number().messages(templatesMsgJoi('Weight')),
  units: Joi.string().required().messages(templatesMsgJoi('units')),
  photo: Joi.array().items(
    Joi.object({
      id: Joi.string().messages(templatesMsgJoi('photo ID of product')),
      url: Joi.string()
        .uri()
        .required()
        .messages(templatesMsgJoi('URL of photo product')),
      alt: Joi.string().messages(templatesMsgJoi('Alt name of photo')),
    }).messages(templatesMsgJoi('Product photo')),
  ),
  description: Joi.string().allow('').messages(templatesMsgJoi('Description')),
  manufacturer: Joi.object({
    country: Joi.string().allow(''),
    factory: Joi.string().allow(''),
    trademark: Joi.string().required(),
  })
    .required()
    .messages(templatesMsgJoi('Manufacturer')),
  category: Joi.array().items(Joi.string()),
});

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    manufactureId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    availability: {
      type: String,
      required: true,
      enum: patterns.availability,
    },
    weight: {
      type: Number,
      default: 0,
    },
    units: {
      type: String,
      default: 'шт',
    },
    photo: [
      {
        id: {
          type: String,
          default: () => nanoid(4),
        },
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: this.name,
        },
      },
    ],
    description: {
      type: String,
      default: '',
    },
    manufacturer: {
      country: {
        type: String,
        default: '',
      },
      factory: {
        type: String,
        default: '',
      },
      trademark: {
        type: String,
        required: true,
      },
    },
    category: {
      type: [String],
      default: [],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

productSchema.post('save', handleMongooseError);
const Product = model('product', productSchema);

module.exports = {
  Product,
  validationProduct,
};
