const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  templatesMsgJoi,
  handleMongooseError,
  patterns,
} = require('../helpers');

const validationProduct = Joi.object({
  name: Joi.string().required().messages(templatesMsgJoi('Product name')),
  vendorCode: Joi.string().allow('').messages(templatesMsgJoi('Vendor Code')),
  price: Joi.number().min(0).required().messages(templatesMsgJoi('Price')),
  availability: Joi.string()
    .valid(...patterns.availability)
    .required()
    .messages(templatesMsgJoi('Availability', patterns.availability)),
  weight: Joi.number().messages(templatesMsgJoi('Weight')),
  units: Joi.string()
    .valid(...patterns.units)
    .messages(templatesMsgJoi('units', patterns.units)),
  quantity: Joi.number().messages(templatesMsgJoi('Quantity of products')),
  photo: Joi.array().items(
    Joi.object({
      url: Joi.string().uri().messages(templatesMsgJoi('URL of photo product')),
      alt: Joi.string().messages(templatesMsgJoi('Alt name of photo')),
    }).messages(templatesMsgJoi('Product photo')),
  ),
  description: Joi.string().allow('').messages(templatesMsgJoi('Description')),
  manufacturer: Joi.object({
    country: Joi.string().allow('').messages(templatesMsgJoi('Country')),
    factory: Joi.string().allow('').messages(templatesMsgJoi('Factory')),
    trademark: Joi.string().required().messages(templatesMsgJoi('Trademark')),
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
  name: Joi.string().messages(templatesMsgJoi('Product name')),
  vendorCode: Joi.string().allow('').messages(templatesMsgJoi('Vendor Code')),
  price: Joi.number().min(0).messages(templatesMsgJoi('Price')),
  availability: Joi.string()
    .valid(...patterns.availability)
    .messages(templatesMsgJoi('Availability', patterns.availability)),
  weight: Joi.number().messages(templatesMsgJoi('Weight')),
  units: Joi.string()
    .valid(...patterns.units)
    .messages(templatesMsgJoi('Units', patterns.units)),
  quantity: Joi.number().messages(templatesMsgJoi('Quantity of products')),
  photo: Joi.array().items(
    Joi.object({
      url: Joi.string().uri().messages(templatesMsgJoi('URL of photo product')),
      alt: Joi.string().messages(templatesMsgJoi('Alt name of photo')),
    }).messages(templatesMsgJoi('Product photo')),
  ),
  description: Joi.string().messages(templatesMsgJoi('Description')),
  manufacturer: Joi.object({
    country: Joi.string().allow('').messages(templatesMsgJoi('Country')),
    factory: Joi.string().allow('').messages(templatesMsgJoi('Factory')),
    trademark: Joi.string().messages(templatesMsgJoi('Trademark')),
  }),
  categories: Joi.array()
    .items(Joi.string().length(24))
    .messages(templatesMsgJoi('Categories')),
  subcategories: Joi.array()
    .items(Joi.string().length(24))
    .messages(templatesMsgJoi('Subcategories')),
});

const photoSchema = new Schema({
  url: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: 'Some spare',
  },
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
    vendorCode: {
      type: String,
      default: '',
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
    quantity: {
      type: Number,
      default: 1,
    },
    photo: [photoSchema],
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
