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
          .description('Product ID')
          .note('input')
          .example('Введіть product ID')
          .length(24)
          .required()
          .messages(templatesMsgJoi('Product ID').commonRules),
        quantity: Joi.number()
          .description('Кількість товару')
          .note('input')
          .example('Введіть кількість товару')
          .required()
          .min(patterns.min.quantity)
          .max(patterns.max.quantity)
          .messages({
            ...templatesMsgJoi('Кількість товару').numberRules,
            ...templatesMsgJoi('Кількість товару').integerNumberRules,
            ...templatesMsgJoi('Кількість товару').commonRules,
          }),
      }),
    )
    .min(1)
    .required()
    .messages({
      ...templatesMsgJoi('Масив товарів в замовленні').arrayRules,
      ...templatesMsgJoi('Масив товарів в замовленні').commonRules,
    }),
  adminTag: Joi.string()
    .description('AdminTag')
    .note('input')
    .example('Введіть adminTag')
    .allow('')
    .min(patterns.min.adminTag)
    .max(patterns.max.adminTag)
    .messages(templatesMsgJoi('AdminTag').textRules),
  userComment: Joi.string()
    .description('Коментар від клієнта')
    .note('input')
    .example('Введіть коментар від клієнта')
    .allow('')
    .min(patterns.min.description)
    .max(patterns.max.description)
    .messages(templatesMsgJoi('Коментар від клієнта').textRules),
});

const validationOrderByAny = Joi.object({
  phone: Joi.string()
    .description('Телефон користувача')
    .note('input')
    .example('Введіть телефон користувача')
    .pattern(patterns.phonePattern)
    .required()
    .messages(
      templatesMsgJoi('Телефон користувача', patterns.phonePatternMessage)
        .regExpRules,
    ),
  email: Joi.string()
    .description('Електронна адреса')
    .note('input')
    .example('Введіть електронну адресу користувача')
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .messages(templatesMsgJoi('Електронна адреса').emailRules),
  username: Joi.string()
    .description("Ім'я користувача")
    .note('input')
    .example("Введіть ім'я користувача")
    .min(patterns.min.user)
    .max(patterns.max.user)
    .messages(templatesMsgJoi("Ім'я користувача").textRules),
  userSurname: Joi.string()
    .description('Прізвище користувача')
    .note('input')
    .example('Введіть прізвище користувача')
    .min(patterns.min.user)
    .max(patterns.max.user)
    .messages(templatesMsgJoi('Прізвище користувача').textRules),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string()
          .description('Product ID')
          .note('input')
          .example('Введіть product ID')
          .length(24)
          .required()
          .messages(templatesMsgJoi('Product ID').commonRules),
        quantity: Joi.number()
          .description('Кількість товару')
          .note('input')
          .example('Введіть кількість товару')
          .required()
          .min(patterns.min.quantity)
          .max(patterns.max.quantity)
          .messages({
            ...templatesMsgJoi('Кількість товару').numberRules,
            ...templatesMsgJoi('Кількість товару').integerNumberRules,
            ...templatesMsgJoi('Кількість товару').commonRules,
          }),
      }),
    )
    .min(1)
    .required()
    .messages({
      ...templatesMsgJoi('Масив товарів в замовленні').arrayRules,
      ...templatesMsgJoi('Масив товарів в замовленні').commonRules,
    }),
  adminTag: Joi.string()
    .description('AdminTag')
    .note('input')
    .example('Введіть adminTag')
    .allow('')
    .min(patterns.min.adminTag)
    .max(patterns.max.adminTag)
    .messages(templatesMsgJoi('AdminTag').textRules),
  userComment: Joi.string()
    .description('Коментар від клієнта')
    .note('input')
    .example('Введіть коментар від клієнта')
    .allow('')
    .min(patterns.min.description)
    .max(patterns.max.description)
    .messages(templatesMsgJoi('Коментар від клієнта').textRules),
  adminId: Joi.string()
    .description('ІД менеджера')
    .note('input')
    .example('Введіть ІД менеджера')
    .length(24)
    .messages({
      ...templatesMsgJoi('ІД менеджера').textRules,
      ...templatesMsgJoi('ІД менеджера').commonRules,
    }),
  adminComment: Joi.string()
    .description('Коментар від менеджера')
    .note('input')
    .example('Введіть коментар від менеджера')
    .allow('')
    .min(patterns.min.description)
    .max(patterns.max.description)
    .messages(templatesMsgJoi('Коментар від менеджера').textRules),
});

const validationUpdateOrder = Joi.object({
  username: Joi.string()
    .description("Ім'я користувача")
    .note('input')
    .example("Введіть ім'я користувача")
    .min(patterns.min.user)
    .max(patterns.max.user)
    .messages(templatesMsgJoi("Ім'я користувача").textRules),
  userSurname: Joi.string()
    .description('Прізвище користувача')
    .note('input')
    .example('Введіть прізвище користувача')
    .min(patterns.min.user)
    .max(patterns.max.user)
    .messages(templatesMsgJoi('Прізвище користувача').textRules),
  phone: Joi.string()
    .description('Телефон користувача')
    .note('input')
    .example('Введіть телефон користувача')
    .pattern(patterns.phonePattern)
    .messages(
      templatesMsgJoi('Телефон користувача', patterns.phonePatternMessage)
        .regExpRules,
    ),
  email: Joi.string()
    .description('Електронна адреса')
    .note('input')
    .example('Введіть електронну адресу користувача')
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .messages(templatesMsgJoi('Електронна адреса').emailRules),
  status: Joi.string()
    .description('Статус замовлення')
    .note('checkbox')
    .example('Оберіть статус замовлення')
    .valid(...patterns.orderStatus)
    .required()
    .messages({
      ...templatesMsgJoi('Статус замовлення', patterns.orderStatus).enumRules,
      ...templatesMsgJoi('Статус замовлення').commonRules,
    }),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string()
          .description('Product ID')
          .note('input')
          .example('Введіть product ID')
          .length(24)
          .required()
          .messages(templatesMsgJoi('Product ID').commonRules),
        quantity: Joi.number()
          .description('Кількість товару')
          .note('input')
          .example('Введіть кількість товару')
          .required()
          .min(patterns.min.quantity)
          .max(patterns.max.quantity)
          .messages({
            ...templatesMsgJoi('Кількість товару').numberRules,
            ...templatesMsgJoi('Кількість товару').integerNumberRules,
            ...templatesMsgJoi('Кількість товару').commonRules,
          }),
      }),
    )
    .messages({
      ...templatesMsgJoi('Масив товарів в замовленні').arrayRules,
      ...templatesMsgJoi('Масив товарів в замовленні').commonRules,
    }),
  adminTag: Joi.string()
    .description('AdminTag')
    .note('input')
    .example('Введіть adminTag')
    .allow('')
    .min(patterns.min.adminTag)
    .max(patterns.max.adminTag)
    .messages(templatesMsgJoi('AdminTag').textRules),
  userComment: Joi.string()
    .description('Коментар від клієнта')
    .note('input')
    .example('Введіть коментар від клієнта')
    .allow('')
    .min(patterns.min.description)
    .max(patterns.max.description)
    .messages(templatesMsgJoi('Коментар від клієнта').textRules),
  adminId: Joi.string()
    .description('ІД менеджера')
    .note('input')
    .example('Введіть ІД менеджера')
    .length(24)
    .messages({
      ...templatesMsgJoi('ІД менеджера').textRules,
      ...templatesMsgJoi('ІД менеджера').commonRules,
    }),
  adminComment: Joi.string()
    .description('Коментар від менеджера')
    .note('input')
    .example('Введіть коментар від менеджера')
    .allow('')
    .min(patterns.min.description)
    .max(patterns.max.description)
    .messages(templatesMsgJoi('Коментар від менеджера').textRules),
});

const validationUpdateOrdersByAdmin = Joi.object({
  status: Joi.string()
    .description('Статус замовлення')
    .note('checkbox')
    .example('Оберіть статус замовлення')
    .valid(...patterns.orderStatus)
    .messages({
      ...templatesMsgJoi('Статус замовлення', patterns.orderStatus).enumRules,
      ...templatesMsgJoi('Статус замовлення').commonRules,
    }),
  adminTag: Joi.string()
    .description('AdminTag')
    .note('input')
    .example('Введіть adminTag')
    .allow('')
    .min(patterns.min.adminTag)
    .max(patterns.max.adminTag)
    .messages(templatesMsgJoi('AdminTag').textRules),
  adminComment: Joi.string()
    .description('Коментар від менеджера')
    .note('input')
    .example('Введіть коментар від менеджера')
    .allow('')
    .min(patterns.min.description)
    .max(patterns.max.description)
    .messages(templatesMsgJoi('Коментар від менеджера').textRules),
  orderIds: Joi.array()
    .items(
      Joi.string()
        .description('ІД замовлення')
        .note('checkBox')
        .example('Оберіть ІД замовлення')
        .length(24)
        .messages({
          ...templatesMsgJoi('ІД замовлення').textRules,
          ...templatesMsgJoi('ІД замовлення').commonRules,
        }),
    )
    .messages(templatesMsgJoi('Масив ІД замовлень').arrayRules),
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

const validationOrderIdsArray = Joi.object({
  orderIds: Joi.array()
    .items(
      Joi.string()
        .description('ІД замовлення')
        .note('checkBox')
        .example('Оберіть ІД замовлення')
        .length(24)
        .messages({
          ...templatesMsgJoi('ІД замовлення').textRules,
          ...templatesMsgJoi('ІД замовлення').commonRules,
        }),
    )
    .min(1)
    .required()
    .messages(templatesMsgJoi('Масив ІД замовлень').arrayRules),
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
      default: patterns.units[0],
    },
  },
  { _id: false },
);

const adminDataSchema = new Schema(
  {
    adminId: {
      type: String,
      default: '',
    },
    adminName: {
      type: String,
      default: '',
    },
    adminSurname: {
      type: String,
      default: '',
    },
    adminComment: {
      type: String,
      default: '',
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
    _id: false,
  },
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
      default: patterns.orderStatus[0],
    },
    totalTypeOfProducts: {
      type: Number,
      default: 0,
    },
    totalProducts: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    adminTag: {
      type: String,
      default: '',
    },
    userComment: {
      type: String,
      default: '',
    },
    adminData: {
      type: adminDataSchema,
      default: null,
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
  validationUpdateOrdersByAdmin,
  validationAdminTag,
  validationOrderIdsArray,
};
