const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  templatesMsgJoi,
  handleMongooseError,
  patterns,
} = require('../helpers');

const validationAddOneProduct = Joi.object({
  name: Joi.string()
    .description('Назва товару')
    .note('input')
    .example('Введіть назву товару')
    .min(patterns.min.productName)
    .max(patterns.max.productName)
    .required()
    .messages({
      ...templatesMsgJoi('Назва товару').commonRules,
      ...templatesMsgJoi('Назва товару').textRules,
    }),
  vendorCode: Joi.string()
    .description('Артикул товару (код виробника)')
    .note('input')
    .example('Введіть артикул товару')
    .min(patterns.min.vendorCode)
    .max(patterns.max.vendorCode)
    .allow('')
    .messages(templatesMsgJoi('Артикул товару').textRules),
  price: Joi.number()
    .description('Ціна за одиницю товару')
    .note('input')
    .example('Введіть ціну за одиницю товару')
    .min(patterns.min.price)
    .max(patterns.max.price)
    .required()
    .messages({
      ...templatesMsgJoi('Ціна').numberRules,
      ...templatesMsgJoi('Ціна').commonRules,
    }),
  availability: Joi.string()
    .description('Доступність товару на складі')
    .note('select')
    .example('Оберіть доступність товару на складі')
    .valid(...patterns.availability)
    .required()
    .messages({
      ...templatesMsgJoi('Доступність товару', patterns.availability).enumRules,
      ...templatesMsgJoi('Доступність товару').commonRules,
    }),
  weight: Joi.number()
    .description('Вага товару (в кг)')
    .note('input')
    .example('Введіть вагу товару (в кг)')
    .min(patterns.min.weight)
    .max(patterns.max.weight)
    .messages(templatesMsgJoi('Вага товару').numberRules),
  units: Joi.string()
    .description('Одиниця вимірювання товару')
    .note('select')
    .example('Оберіть одиниці вимірювання товару')
    .valid(...patterns.units)
    .messages(templatesMsgJoi('Одиниця вимірювання', patterns.units).enumRules),
  quantity: Joi.number()
    .description('Кількість товару')
    .note('input')
    .example('Введіть кількість товару')
    .min(patterns.min.quantity)
    .max(patterns.max.quantity)
    .messages({
      ...templatesMsgJoi('Кількість товару').numberRules,
      ...templatesMsgJoi('Кількість товару').integerNumberRules,
      ...templatesMsgJoi('Кількість товару').commonRules,
    }),
  photo: Joi.array().items(
    Joi.object({
      url: Joi.string()
        .description('Фото товару')
        .note('input')
        .example('Завантажте фото товару')
        .uri()
        .required()
        .messages({
          ...templatesMsgJoi('URL фото').urlRules,
          ...templatesMsgJoi('URL фото').commonRules,
        }),
      alt: Joi.string()
        .description('Опис фотографії товару')
        .note('input')
        .example('Введіть опис фотографії товару')
        .min(patterns.min.alt)
        .max(patterns.max.alt)
        .required()
        .messages({
          ...templatesMsgJoi('Опис фотографії товару').textRules,
          ...templatesMsgJoi('Опис фотографії товару').commonRules,
        }),
    }).messages(templatesMsgJoi('Фотографія товару').arrayRules),
  ),
  description: Joi.string()
    .description('Опис товару')
    .note('input')
    .example('Введіть опис товару')
    .allow('')
    .min(patterns.min.description)
    .max(patterns.max.description)
    .messages(templatesMsgJoi('Опис товару').textRules),
  manufacturer: Joi.object({
    country: Joi.string()
      .description('Країна виробництва товару')
      .note('input')
      .example('Введіть країну виробництва товару')
      .allow('')
      .min(patterns.min.manufacturer)
      .max(patterns.max.manufacturer)
      .messages(templatesMsgJoi('Країна виробництва').textRules),
    factory: Joi.string()
      .description('Завод-виробник товару')
      .note('input')
      .example('Введіть завод-виробник товару')
      .allow('')
      .min(patterns.min.manufacturer)
      .max(patterns.max.manufacturer)
      .messages(templatesMsgJoi('Завод-виробник').textRules),
    trademark: Joi.string()
      .description('Торгова марка')
      .note('input')
      .example('Введіть торгову марка')
      .min(patterns.min.manufacturer)
      .max(patterns.max.manufacturer)
      .required()
      .messages({
        ...templatesMsgJoi('Торгова марка').textRules,
        ...templatesMsgJoi('Торгова марка').commonRules,
      }),
  })
    .required()
    .messages(
      templatesMsgJoi('Дані по виробнику і торговій марці').commonRules,
    ),
  categories: Joi.array()
    .items(
      Joi.string()
        .description('Категорія товару')
        .note('input')
        .example('Оберіть категорію товару')
        .length(24)
        .required()
        .messages({
          ...templatesMsgJoi('ІД категорії товару').commonRules,
          ...templatesMsgJoi('ІД категорії товару').textRules,
        }),
    )
    .required()
    .messages({
      ...templatesMsgJoi('Масив категорій товарів').arrayRules,
      ...templatesMsgJoi('Масив категорій товарів').commonRules,
    }),
  subcategories: Joi.array()
    .items(
      Joi.string()
        .description('Підкатегорія товару')
        .note('input')
        .example('Оберіть підкатегорію товару')
        .length(24)
        .messages(templatesMsgJoi('ІД підкатегорії товару').textRules),
    )
    .allow(null)
    .messages(templatesMsgJoi('Підкатегорії товару').arrayRules),
});

const validationAddProducts = Joi.array()
  .items(validationAddOneProduct)
  .required()
  .messages({
    ...templatesMsgJoi('Масив додавання товарів').arrayRules,
    ...templatesMsgJoi('Масив додавання товарів').commonRules,
  });

const validationUpdateProduct = Joi.object({
  name: Joi.string()
    .description('Назва товару')
    .note('input')
    .example('Введіть назву товару')
    .min(patterns.min.productName)
    .max(patterns.max.productName)
    .messages(templatesMsgJoi('Назва товару').textRules),
  vendorCode: Joi.string()
    .description('Артикул товару (код виробника)')
    .note('input')
    .example('Введіть артикул товару')
    .min(patterns.min.vendorCode)
    .max(patterns.max.vendorCode)
    .allow('')
    .messages(templatesMsgJoi('Артикул товару').textRules),
  price: Joi.object({
    value: Joi.number()
      .description('Ціна за одиницю товару')
      .note('input')
      .example('Введіть ціну за одиницю товару')
      .min(patterns.min.price)
      .max(patterns.max.price)
      .messages(templatesMsgJoi('Ціна').numberRules),
  }),
  availability: Joi.string()
    .description('Доступність товару на складі')
    .note('select')
    .example('Оберіть доступність товару на складі')
    .valid(...patterns.availability)
    .messages(
      templatesMsgJoi('Доступність товару', patterns.availability).enumRules,
    ),
  weight: Joi.number()
    .description('Вага товару (в кг)')
    .note('input')
    .example('Введіть вагу товару (в кг)')
    .min(patterns.min.weight)
    .max(patterns.max.weight)
    .messages(templatesMsgJoi('Вага товару').numberRules),
  units: Joi.string()
    .description('Одиниця вимірювання товару')
    .note('select')
    .example('Оберіть одиниці вимірювання товару')
    .valid(...patterns.units)
    .messages(templatesMsgJoi('Одиниця вимірювання', patterns.units).enumRules),
  quantity: Joi.number()
    .description('Кількість товару')
    .note('input')
    .example('Введіть кількість товару')
    .min(patterns.min.quantity)
    .max(patterns.max.quantity)
    .messages({
      ...templatesMsgJoi('Кількість товару').numberRules,
      ...templatesMsgJoi('Кількість товару').integerNumberRules,
      ...templatesMsgJoi('Кількість товару').commonRules,
    }),
  photo: Joi.array().items(
    Joi.object({
      url: Joi.string()
        .description('Фото товару')
        .note('input')
        .example('Завантажте фото товару')
        .uri()
        .messages(templatesMsgJoi('URL фото').urlRules),
      alt: Joi.string()
        .description('Опис фотографії товару')
        .note('input')
        .example('Введіть опис фотографії товару')
        .min(patterns.min.alt)
        .max(patterns.max.alt)
        .messages(templatesMsgJoi('Опис фотографії товару').textRules),
    }).messages(templatesMsgJoi('Фотографія товару').arrayRules),
  ),
  description: Joi.string()
    .description('Опис товару')
    .note('input')
    .example('Введіть опис товару')
    .allow('')
    .min(patterns.min.description)
    .max(patterns.max.description)
    .messages(templatesMsgJoi('Опис товару').textRules),
  manufacturer: Joi.object({
    country: Joi.string()
      .description('Країна виробництва товару')
      .note('input')
      .example('Введіть країну виробництва товару')
      .allow('')
      .min(patterns.min.manufacturer)
      .max(patterns.max.manufacturer)
      .messages(templatesMsgJoi('Країна виробництва').textRules),
    factory: Joi.string()
      .description('Завод-виробник товару')
      .note('input')
      .example('Введіть завод-виробник товару')
      .allow('')
      .min(patterns.min.manufacturer)
      .max(patterns.max.manufacturer)
      .messages(templatesMsgJoi('Завод-виробник').textRules),
    trademark: Joi.string()
      .description('Торгова марка')
      .note('input')
      .example('Введіть торгову марка')
      .min(patterns.min.manufacturer)
      .max(patterns.max.manufacturer)
      .messages(templatesMsgJoi('Торгова марка').textRules),
  }).messages(
    templatesMsgJoi('Дані по виробнику і торговій марці').commonRules,
  ),
  categories: Joi.array()
    .items(
      Joi.string()
        .description('Категорія товару')
        .note('input')
        .example('Оберіть категорію товару')
        .length(24)
        .messages(templatesMsgJoi('ІД категорії товару').textRules),
    )
    .messages(templatesMsgJoi('Категорії товару').arrayRules),
  subcategories: Joi.array()
    .items(
      Joi.string()
        .description('Підкатегорія товару')
        .note('input')
        .example('Оберіть підкатегорію товару')
        .length(24)
        .messages(templatesMsgJoi('ІД підкатегорії товару').textRules),
    )
    .messages(templatesMsgJoi('Підкатегорії товару').arrayRules),
});

const validationProductIdsArray = Joi.object({
  productIds: Joi.array()
    .items(
      Joi.string()
        .description('ІД товару')
        .note('checkBox')
        .example('Оберіть ІД товару')
        .length(24)
        .messages({
          ...templatesMsgJoi('ІД товару').textRules,
          ...templatesMsgJoi('ІД товару').commonRules,
        }),
    )
    .min(1)
    .required()
    .messages(templatesMsgJoi('Масив ІД товарів').arrayRules),
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

const priceSchema = new Schema(
  {
    value: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: false, updatedAt: true },
    _id: false,
  },
);

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
    price: priceSchema,
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
      default: patterns.units[0],
    },
    quantity: {
      type: Number,
      default: 0,
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
  validationAddOneProduct,
  validationAddProducts,
  validationUpdateProduct,
  validationProductIdsArray,
};
