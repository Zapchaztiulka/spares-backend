const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  handleMongooseError,
  templatesMsgJoi,
  patterns,
} = require('../helpers');

const availableDeliveryMethodIds = patterns.deliveryMethods
  .filter(method => method.isAvailable)
  .map(method => method.deliveryMethodId);

const userValidation = {
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
  userMiddleName: Joi.string()
    .description('По батькові користувача')
    .note('input')
    .example('Введіть по батькові користувача')
    .min(patterns.min.user)
    .max(patterns.max.user)
    .allow('')
    .messages(templatesMsgJoi('По батькові користувача').textRules),
};

const orderDataValidation = {
  userType: Joi.string()
    .description('Тип користувача')
    .note('select')
    .example('Оберіть тип користувача')
    .valid(...patterns.userTypes)
    .messages(templatesMsgJoi('Тип користувача', patterns.userTypes).enumRules),
  deliveryMethodId: Joi.string()
    .description('ІД способу доставки')
    .note('select')
    .example('Оберіть ІД способу доставки')
    .valid(...availableDeliveryMethodIds)
    .messages(
      templatesMsgJoi('ІД способу доставки', availableDeliveryMethodIds)
        .enumRules,
    ),
  deliveryRegion: Joi.string()
    .description('Область доставки')
    .note('input')
    .example('Введіть область доставки')
    .min(patterns.min.companyRegion)
    .max(patterns.max.companyRegion)
    .allow('')
    .messages(templatesMsgJoi('Область доставки').textRules),
  deliveryDistrict: Joi.string()
    .description('Район доставки')
    .note('input')
    .example('Введіть район доставки')
    .min(patterns.min.companyRegion)
    .max(patterns.max.companyRegion)
    .allow('')
    .messages(templatesMsgJoi('Район доставки').textRules),
  deliveryCity: Joi.string()
    .description('Місто доставки')
    .note('input')
    .example('Введіть місто доставки')
    .min(patterns.min.companyCity)
    .max(patterns.max.companyCity)
    .allow('')
    .messages(templatesMsgJoi('Місто доставки').textRules),
  deliveryAddress: Joi.string()
    .description('Адреса доставки')
    .note('input')
    .example('Введіть адреса доставки')
    .min(patterns.min.companyAddress)
    .max(patterns.max.companyAddress)
    .allow('')
    .messages(templatesMsgJoi('Адреса доставки').textRules),
  deliveryOffice: Joi.string()
    .description('Офіс магазину або номер поштового відділення')
    .note('input')
    .example('Введіть офіс магазину або номер поштового відділення')
    .min(patterns.min.companyName)
    .max(patterns.max.companyName)
    .allow('')
    .messages(
      templatesMsgJoi('Офіс магазину або номер поштового відділення').textRules,
    ),
  deliveryRate: Joi.number()
    .description('Тариф за доставку')
    .note('input')
    .example('Введіть тариф за доставку')
    .min(patterns.min.deliveryRate)
    .max(patterns.max.deliveryRate)
    .messages(templatesMsgJoi('Тариф за доставку').numberRules),
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
};

const legalEntityDataValidation = {
  companyName: Joi.string()
    .description('Назва юридичної особи')
    .note('input')
    .example('Введіть назву юридичної особи')
    .min(patterns.min.companyName)
    .max(patterns.max.companyName)
    .required()
    .messages({
      ...templatesMsgJoi('Назва юридичної особи').textRules,
      ...templatesMsgJoi('Назва юридичної особи').commonRules,
    }),
  companyCode: Joi.string()
    .description('ЄДРПОУ юридичної особи або ІПН ФОП')
    .note('input')
    .example('Введіть ЄДРПОУ юридичної особи або ІПН ФОП')
    .min(8)
    .max(10)
    .custom((value, helpers) =>
      patterns.isNumeric(value) ? value : helpers.error('string.digits'),
    )
    .required()
    .messages({
      ...templatesMsgJoi('ЄДРПОУ юридичної особи або ІПН ФОП').textRules,
      ...templatesMsgJoi('ЄДРПОУ юридичної особи або ІПН ФОП').commonRules,
    }),
  companyRegion: Joi.string()
    .description('Область реєстрації юридичної особи')
    .note('input')
    .example('Введіть область реєстрації юридичної особи')
    .min(patterns.min.companyRegion)
    .max(patterns.max.companyRegion)
    .allow('')
    .messages(templatesMsgJoi('Область реєстрації юридичної особи').textRules),
  companyCity: Joi.string()
    .description('Місто реєстрації юридичної особи')
    .note('input')
    .example('Введіть місто реєстрації юридичної особи')
    .min(patterns.min.companyCity)
    .max(patterns.max.companyCity)
    .required()
    .messages({
      ...templatesMsgJoi('Місто реєстрації юридичної особи').textRules,
      ...templatesMsgJoi('Місто реєстрації юридичної особи').commonRules,
    }),
  companyAddress: Joi.string()
    .description('Адреса реєстрації юридичної особи')
    .note('input')
    .example('Введіть адреса реєстрації юридичної особи')
    .min(patterns.min.companyAddress)
    .max(patterns.max.companyAddress)
    .required()
    .messages({
      ...templatesMsgJoi('Адреса реєстрації юридичної особи').textRules,
      ...templatesMsgJoi('Адреса реєстрації юридичної особи').commonRules,
    }),
};

const validationOrderByUser = Joi.object({
  legalEntityData: Joi.object({ ...legalEntityDataValidation }).messages(
    templatesMsgJoi('Дані по юридичній особі').commonRules,
  ),
  ...orderDataValidation,
});

const validationOrderByAny = Joi.object({
  phone: Joi.string()
    .description('Телефон користувача')
    .note('input')
    .example('Введіть телефон користувача')
    .pattern(patterns.phonePattern)
    .required()
    .messages({
      ...templatesMsgJoi('Телефон користувача', patterns.phonePatternMessage)
        .regExpRules,
      ...templatesMsgJoi('Телефон користувача').commonRules,
    }),
  ...userValidation,
  legalEntityData: Joi.object({ ...legalEntityDataValidation }).messages(
    templatesMsgJoi('Дані по юридичній особі').commonRules,
  ),
  status: Joi.string()
    .description('Статус замовлення')
    .note('checkbox')
    .example('Оберіть статус замовлення')
    .valid(...patterns.orderStatus)
    .messages(
      templatesMsgJoi('Статус замовлення', patterns.orderStatus).enumRules,
    ),
  ...orderDataValidation,
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
  phone: Joi.string()
    .description('Телефон користувача')
    .note('input')
    .example('Введіть телефон користувача')
    .pattern(patterns.phonePattern)
    .messages(
      templatesMsgJoi('Телефон користувача', patterns.phonePatternMessage)
        .regExpRules,
    ),
  ...userValidation,
  legalEntityData: Joi.object({
    companyName: Joi.string()
      .description('Назва юридичної особи')
      .note('input')
      .example('Введіть назву юридичної особи')
      .min(patterns.min.companyName)
      .max(patterns.max.companyName)
      .messages(templatesMsgJoi('Назва юридичної особи').textRules),
    companyCode: Joi.string()
      .description('ЄДРПОУ юридичної особи або ІПН ФОП')
      .note('input')
      .example('Введіть ЄДРПОУ юридичної особи або ІПН ФОП')
      .min(8)
      .max(10)
      .custom((value, helpers) =>
        patterns.isNumeric(value) ? value : helpers.error('string.digits'),
      )
      .messages(
        templatesMsgJoi('ЄДРПОУ юридичної особи або ІПН ФОП').textRules,
      ),
    companyRegion: Joi.string()
      .description('Область реєстрації юридичної особи')
      .note('input')
      .example('Введіть область реєстрації юридичної особи')
      .min(patterns.min.companyRegion)
      .max(patterns.max.companyRegion)
      .allow('')
      .messages(
        templatesMsgJoi('Область реєстрації юридичної особи').textRules,
      ),
    companyCity: Joi.string()
      .description('Місто реєстрації юридичної особи')
      .note('input')
      .example('Введіть місто реєстрації юридичної особи')
      .min(patterns.min.companyCity)
      .max(patterns.max.companyCity)
      .messages(templatesMsgJoi('Місто реєстрації юридичної особи').textRules),
    companyAddress: Joi.string()
      .description('Адреса реєстрації юридичної особи')
      .note('input')
      .example('Введіть адреса реєстрації юридичної особи')
      .min(patterns.min.companyAddress)
      .max(patterns.max.companyAddress)
      .messages(templatesMsgJoi('Адреса реєстрації юридичної особи').textRules),
  })
    .allow(null)
    .messages(templatesMsgJoi('Дані по юридичній особі').commonRules),
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
  ...orderDataValidation,
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
    .min(patterns.min.answer)
    .max(patterns.max.answer)
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
    .required()
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
  { versionKey: false, timestamps: false, _id: false },
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
  { versionKey: false, timestamps: false, _id: false },
);

const deliveryDataSchema = new Schema(
  {
    deliveryMethodId: {
      type: String,
      default: '',
    },
    deliveryMethodName: {
      type: String,
      default: '',
    },
    deliveryRegion: {
      type: String,
      default: '',
    },
    deliveryDistrict: {
      type: String,
      default: '',
    },
    deliveryCity: {
      type: String,
      default: '',
    },
    deliveryAddress: {
      type: String,
      default: '',
    },
    deliveryOffice: {
      type: String,
      default: '',
    },
    deliveryRate: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: false, _id: false },
);

const legalEntityDataSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    companyCode: {
      type: String,
      required: true,
    },
    companyRegion: {
      type: String,
      default: '',
    },
    companyCity: {
      type: String,
      required: true,
    },
    companyAddress: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: false, _id: false },
);

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    userType: {
      type: String,
      default: patterns.userTypes[0],
    },
    username: {
      type: String,
      default: '',
    },
    userMiddleName: {
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
    legalEntityData:
      {
        type: legalEntityDataSchema,
        default: null,
      } || null,
    products: [orderProductSchema],
    status: {
      type: String,
      enum: patterns.orderStatus,
      default: patterns.orderStatus[0],
    },
    deliveryData: deliveryDataSchema,
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
    totalPriceWithDelivery: {
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
  validationUpdateOrdersByAdmin,
  validationAdminTag,
  validationOrderIdsArray,
};
