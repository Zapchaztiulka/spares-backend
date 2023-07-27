const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  templatesMsgJoi,
  handleMongooseError,
  patterns,
} = require('../helpers');

const validationProduct = Joi.object({
  name: Joi.string().required().messages(templatesMsgJoi('product name')),
  manufactureId: Joi.string()
    .required()
    .messages(templatesMsgJoi('manufacture Id')),
  price: Joi.number().min(0).required().messages(templatesMsgJoi('price')),
  availability: Joi.string()
    .valid(...patterns.availability)
    .required()
    .messages(templatesMsgJoi('availability', patterns.availability)),
  weight: Joi.number().messages(templatesMsgJoi('Weight')),
  units: Joi.string()
    .valid(...patterns.units)
    .messages(templatesMsgJoi('units', patterns.units)),
  photo: Joi.array().items(
    Joi.object({
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
  categories: Joi.array()
    .items(Joi.string().length(24))
    .required()
    .messages(templatesMsgJoi('Categories')),
  subcategories: Joi.array()
    .items(Joi.string().length(24))
    .messages(templatesMsgJoi('Subcategories')),
});

const validationUpdateProduct = Joi.object({
  name: Joi.string().messages(templatesMsgJoi('product name')),
  manufactureId: Joi.string().messages(templatesMsgJoi('manufacture Id')),
  price: Joi.number().min(0).messages(templatesMsgJoi('price')),
  availability: Joi.string()
    .valid(...patterns.availability)
    .messages(templatesMsgJoi('availability', patterns.availability)),
  weight: Joi.number().messages(templatesMsgJoi('Weight')),
  units: Joi.string()
    .valid(...patterns.units)
    .messages(templatesMsgJoi('units', patterns.units)),
  photo: Joi.array().items(
    Joi.object({
      url: Joi.string().uri().messages(templatesMsgJoi('URL of photo product')),
      alt: Joi.string().messages(templatesMsgJoi('Alt name of photo')),
    }).messages(templatesMsgJoi('Product photo')),
  ),
  description: Joi.string().messages(templatesMsgJoi('Description')),
  manufacturer: Joi.object({
    country: Joi.string().allow(''),
    factory: Joi.string().allow(''),
    trademark: Joi.string(),
  }),
  categories: Joi.array()
    .items(Joi.string().length(24))
    .messages(templatesMsgJoi('Categories')),
  subcategories: Joi.array()
    .items(Joi.string().length(24))
    .messages(templatesMsgJoi('Subcategories')),
});

const manufacturerSchema = new Schema({
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
});

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    manufactureId: {
      type: String,
      unique: true,
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
      enum: patterns.units,
      default: 'шт',
    },
    photo: [
      {
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
      type: manufacturerSchema,
      required: true,
    },
    categories: [{ _id: Schema.Types.ObjectId, categoryName: String }],
    subcategories: [{ _id: Schema.Types.ObjectId, subcategoryName: String }],
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
  validationUpdateProduct,
};
