const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  handleMongooseError,
  patterns,
  templatesMsgJoi,
} = require('../helpers');

const validationAuthUser = Joi.object({
  username: Joi.string()
    .description("Ім'я користувача")
    .note('input')
    .example("Введіть ім'я користувача")
    .allow('')
    .min(patterns.min.user)
    .max(patterns.max.user)
    .messages(templatesMsgJoi("Ім'я користувача").textRules),
  userSurname: Joi.string()
    .description('Прізвище користувача')
    .note('input')
    .example('Введіть прізвище користувача')
    .allow('')
    .min(patterns.min.user)
    .max(patterns.max.user)
    .messages(templatesMsgJoi('Прізвище користувача').textRules),
  password: Joi.string()
    .description('Пароль')
    .note('input')
    .example('Введіть пароль')
    .pattern(patterns.passwordPattern)
    .required()
    .messages({
      ...templatesMsgJoi('Пароль', patterns.passwordPatternMessage).regExpRules,
      ...templatesMsgJoi('Пароль').commonRules,
    }),
  email: Joi.string()
    .description('Електронна адреса')
    .note('input')
    .example('Введіть електронну адресу користувача')
    .tag('unique')
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .required()
    .messages({
      ...templatesMsgJoi('Електронна адреса').emailRules,
      ...templatesMsgJoi('Електронна адреса').commonRules,
    }),
  phone: Joi.string()
    .description('Телефон користувача')
    .note('input')
    .example('Введіть телефон користувача')
    .tag('unique')
    .allow('')
    .pattern(patterns.phonePattern)
    .messages(
      templatesMsgJoi('Телефон', patterns.phonePatternMessage).regExpRules,
    ),
  role: Joi.string()
    .description('Роль користувача')
    .note('select')
    .example('Оберіть роль користувача')
    .valid(...patterns.roles)
    .messages(templatesMsgJoi('Роль користувача', patterns.roles).enumRules),
});

const validationUpdateUser = Joi.object({
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
  email: Joi.string()
    .description('Електронна адреса')
    .note('input')
    .example('Введіть електронну адресу користувача')
    .tag('unique')
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .messages(templatesMsgJoi('Електронна адреса').emailRules),
  phone: Joi.string()
    .description('Телефон')
    .note('input')
    .example('Введіть телефон користувача')
    .tag('unique')
    .pattern(patterns.phonePattern)
    .messages(
      templatesMsgJoi('Телефон', patterns.phonePatternMessage).regExpRules,
    ),
  role: Joi.string()
    .description('Роль користувача')
    .note('select')
    .example('Введіть роль користувача')
    .valid(...patterns.roles)
    .messages(templatesMsgJoi('Роль користувача', patterns.roles).enumRules),
});

const validationEmailUser = Joi.object({
  email: Joi.string()
    .description('Електронна адреса')
    .note('input')
    .example('Введіть електронну адресу користувача')
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .required()
    .messages({
      ...templatesMsgJoi('Електронна адреса').emailRules,
      ...templatesMsgJoi('Електронна адреса').commonRules,
    }),
});

const validationPasswordUser = Joi.object({
  password1: Joi.string()
    .description('Пароль')
    .note('input')
    .example('Введіть пароль')
    .pattern(patterns.passwordPattern)
    .required()
    .messages({
      ...templatesMsgJoi('Пароль', patterns.passwordPatternMessage).regExpRules,
      ...templatesMsgJoi('Пароль').commonRules,
    }),
  password2: Joi.string()
    .description('Підтвердження паролю')
    .note('input')
    .example('Введіть пароль ще раз')
    .pattern(patterns.passwordPattern)
    .required()
    .messages({
      ...templatesMsgJoi(
        'Підтвердження паролю',
        patterns.passwordPatternMessage,
      ).regExpRules,
      ...templatesMsgJoi('Підтвердження паролю').commonRules,
    }),
});

const validationAccess = Joi.object({
  photoAddAccess: Joi.boolean()
    .description('Доступ на додавання фото товару')
    .note('checkBox')
    .example('на додавання фото товару:')
    .messages(templatesMsgJoi('Доступ на додавання фото товару').booleanRules),
  deleteProductAccess: Joi.boolean()
    .description('Доступ на видалення товару')
    .note('checkBox')
    .example('на видалення товару:')
    .messages(templatesMsgJoi('Доступ на видалення товару').booleanRules),
  updateProductAccess: Joi.boolean()
    .description('Доступ на оновлення товару')
    .note('checkBox')
    .example('на оновлення товару:')
    .messages(templatesMsgJoi('Доступ на оновлення товару').booleanRules),
  deleteCategoryAccess: Joi.boolean()
    .description('Доступ на видалення категорії')
    .note('checkBox')
    .example('на видалення категорії:')
    .messages(templatesMsgJoi('Доступ на видалення категорії').booleanRules),
  updateCategoryAccess: Joi.boolean()
    .description('Доступ на оновлення категорії')
    .note('checkBox')
    .example('на оновлення категорії:')
    .messages(templatesMsgJoi('Доступ на оновлення категорії').booleanRules),
});

// ====================================================
const userSchema = new Schema(
  {
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
      unique: true,
      match: patterns.emailPattern,
      required: [
        true,
        'The email is required. Please provide an email address for user',
      ],
    },
    phone: {
      type: String,
      unique: true,
      match: patterns.phonePattern,
      default: '',
    },
    password: {
      type: String,
      match: patterns.passwordPattern,
      required: [true, 'The password is required. Set it for user'],
    },
    role: {
      type: String,
      enum: patterns.roles,
      default: patterns.roles[2],
    },
    token: {
      type: String,
      default: '',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: '',
    },
    access: {
      photoAddAccess: {
        type: Boolean,
        default: false,
      },
      deleteProductAccess: {
        type: Boolean,
        default: false,
      },
      updateProductAccess: {
        type: Boolean,
        default: false,
      },
      deleteCategoryAccess: {
        type: Boolean,
        default: false,
      },
      updateCategoryAccess: {
        type: Boolean,
        default: false,
      },
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handleMongooseError);
const User = model('user', userSchema);

module.exports = {
  User,
  validationAuthUser,
  validationUpdateUser,
  validationEmailUser,
  validationPasswordUser,
  validationAccess,
};
