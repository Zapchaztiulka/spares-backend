const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  templatesMsgJoi,
  handleMongooseError,
  patterns,
} = require('../helpers');

const validationAddProducts = Joi.array().items(
  Joi.object({
    name: Joi.string()
      .min(patterns.min.productName)
      .max(patterns.max.productName)
      .required()
      .messages({
        ...templatesMsgJoi('Product name').commonRules,
        ...templatesMsgJoi('Product name').textRules,
      }),
    vendorCode: Joi.string()
      .min(patterns.min.vendorCode)
      .max(patterns.max.vendorCode)
      .allow('')
      .messages(templatesMsgJoi('Vendor code').textRules),
    price: Joi.number()
      .min(patterns.min.price)
      .max(patterns.max.price)
      .required()
      .messages({
        ...templatesMsgJoi('Price').numberRules,
        ...templatesMsgJoi('Price').commonRules,
      }),
    availability: Joi.string()
      .valid(...patterns.availability)
      .required()
      .messages({
        ...templatesMsgJoi('Availability', patterns.availability).enumRules,
        ...templatesMsgJoi('Availability').commonRules,
      }),
    weight: Joi.number()
      .min(patterns.min.weight)
      .max(patterns.max.weight)
      .messages(templatesMsgJoi('Weight').numberRules),
    units: Joi.string()
      .valid(...patterns.units)
      .messages(templatesMsgJoi('Units', patterns.units).enumRules),
    quantity: Joi.number()
      .min(patterns.min.quantity)
      .max(patterns.max.quantity)
      .messages({
        ...templatesMsgJoi('Quantity').numberRules,
        ...templatesMsgJoi('Quantity').integerNumberRules,
        ...templatesMsgJoi('Quantity').commonRules,
      }),
    photo: Joi.array().items(
      Joi.object({
        url: Joi.string()
          .uri()
          .required()
          .messages({
            ...templatesMsgJoi('URL of photo').urlRules,
            ...templatesMsgJoi('URL of photo').commonRules,
          }),
        alt: Joi.string()
          .min(patterns.min.alt)
          .max(patterns.max.alt)
          .required()
          .messages({
            ...templatesMsgJoi('Alt of photo').textRules,
            ...templatesMsgJoi('URL of photo').commonRules,
          }),
      }).messages(templatesMsgJoi('Photo').arrayRules),
    ),
    description: Joi.string()
      .allow('')
      .min(patterns.min.description)
      .max(patterns.max.description)
      .messages(templatesMsgJoi('Description').textRules),
    manufacturer: Joi.object({
      country: Joi.string()
        .allow('')
        .min(patterns.min.manufacturer)
        .max(patterns.max.manufacturer)
        .messages(templatesMsgJoi('Country').textRules),
      factory: Joi.string()
        .allow('')
        .min(patterns.min.manufacturer)
        .max(patterns.max.manufacturer)
        .messages(templatesMsgJoi('Factory').textRules),
      trademark: Joi.string()
        .min(patterns.min.manufacturer)
        .max(patterns.max.manufacturer)
        .required()
        .messages({
          ...templatesMsgJoi('Trademark').textRules,
          ...templatesMsgJoi('Trademark').commonRules,
        }),
    })
      .required()
      .messages(templatesMsgJoi('Manufacturer').commonRules),
    categories: Joi.array()
      .items(
        Joi.string()
          .length(24)
          .required()
          .messages(templatesMsgJoi('Category ID').commonRules),
      )
      .required()
      .messages(templatesMsgJoi('Categories').arrayRules),
    subcategories: Joi.array()
      .items(
        Joi.string()
          .length(24)
          .required()
          .messages(templatesMsgJoi('Subcategory ID').commonRules),
      )
      .messages(templatesMsgJoi('Subcategories').arrayRules),
  })
    .required()
    .messages({
      ...templatesMsgJoi('Adding products array').arrayRules,
      ...templatesMsgJoi('Adding products array').commonRules,
    }),
);

const validationUpdateProduct = Joi.object({
  name: Joi.string()
    .min(patterns.min.productName)
    .max(patterns.max.productName)
    .messages({
      ...templatesMsgJoi('Product name').commonRules,
      ...templatesMsgJoi('Product name').textRules,
    }),
  vendorCode: Joi.string()
    .min(patterns.min.vendorCode)
    .max(patterns.max.vendorCode)
    .allow('')
    .messages(templatesMsgJoi('Vendor code').textRules),
  price: Joi.number()
    .min(patterns.min.price)
    .max(patterns.max.price)
    .messages({
      ...templatesMsgJoi('Price').numberRules,
      ...templatesMsgJoi('Price').commonRules,
    }),
  availability: Joi.string()
    .valid(...patterns.availability)
    .messages({
      ...templatesMsgJoi('Availability', patterns.availability).enumRules,
      ...templatesMsgJoi('Availability').commonRules,
    }),
  weight: Joi.number()
    .min(patterns.min.weight)
    .max(patterns.max.weight)
    .messages(templatesMsgJoi('Weight').numberRules),
  units: Joi.string()
    .valid(...patterns.units)
    .messages(templatesMsgJoi('Units', patterns.units).enumRules),
  quantity: Joi.number()
    .min(patterns.min.quantity)
    .max(patterns.max.quantity)
    .messages({
      ...templatesMsgJoi('Quantity').numberRules,
      ...templatesMsgJoi('Quantity').integerNumberRules,
      ...templatesMsgJoi('Quantity').commonRules,
    }),
  photo: Joi.array().items(
    Joi.object({
      url: Joi.string()
        .uri()
        .messages({
          ...templatesMsgJoi('URL of photo').urlRules,
          ...templatesMsgJoi('URL of photo').commonRules,
        }),
      alt: Joi.string()
        .min(patterns.min.alt)
        .max(patterns.max.alt)
        .messages({
          ...templatesMsgJoi('Alt of photo').textRules,
          ...templatesMsgJoi('URL of photo').commonRules,
        }),
    }).messages(templatesMsgJoi('Photo').arrayRules),
  ),
  description: Joi.string()
    .allow('')
    .min(patterns.min.description)
    .max(patterns.max.description)
    .messages(templatesMsgJoi('Description').textRules),
  manufacturer: Joi.object({
    country: Joi.string()
      .allow('')
      .min(patterns.min.manufacturer)
      .max(patterns.max.manufacturer)
      .messages(templatesMsgJoi('Country').textRules),
    factory: Joi.string()
      .allow('')
      .min(patterns.min.manufacturer)
      .max(patterns.max.manufacturer)
      .messages(templatesMsgJoi('Factory').textRules),
    trademark: Joi.string()
      .min(patterns.min.manufacturer)
      .max(patterns.max.manufacturer)
      .messages({
        ...templatesMsgJoi('Trademark').textRules,
        ...templatesMsgJoi('Trademark').commonRules,
      }),
  }).messages(templatesMsgJoi('Manufacturer').commonRules),
  categories: Joi.array()
    .items(
      Joi.string()
        .length(24)
        .messages(templatesMsgJoi('Category ID').commonRules),
    )
    .messages(templatesMsgJoi('Categories').arrayRules),
  subcategories: Joi.array()
    .items(
      Joi.string()
        .length(24)
        .messages(templatesMsgJoi('Subcategory ID').commonRules),
    )
    .messages(templatesMsgJoi('Subcategories').arrayRules),
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
  validationAddProducts,
  validationUpdateProduct,
};
