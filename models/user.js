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
    .min(patterns.min.user)
    .max(patterns.max.user)
    .messages(templatesMsgJoi('Username').textRules),
  userSurname: Joi.string()
    .description('Прізвище користувача')
    .note('input')
    .example('Введіть прізвище користувача')
    .min(patterns.min.user)
    .max(patterns.max.user)
    .messages(templatesMsgJoi('Surname of user').textRules),
  password: Joi.string()
    .description('Пароль')
    .note('input')
    .example('Введіть пароль')
    .pattern(patterns.passwordPattern)
    .required()
    .messages({
      ...templatesMsgJoi('Password', patterns.passwordPatternMessage)
        .regExpRules,
      ...templatesMsgJoi('Password').commonRules,
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
      ...templatesMsgJoi('Email').emailRules,
      ...templatesMsgJoi('Email').commonRules,
    }),
  phone: Joi.string()
    .description('Телефон')
    .note('input')
    .example('Введіть телефон користувача')
    .tag('unique')
    .pattern(patterns.phonePattern)
    .messages(
      templatesMsgJoi('Phone', patterns.phonePatternMessage).regExpRules,
    ),
  role: Joi.string()
    .description('Роль користувача')
    .note('select')
    .example('Введіть роль користувача')
    .valid(...patterns.roles)
    .messages(templatesMsgJoi('Role', patterns.roles).enumRules),
});

const validationUpdateUser = Joi.object({
  username: Joi.string()
    .description("Ім'я користувача")
    .note('input')
    .example("Введіть ім'я користувача")
    .min(patterns.min.user)
    .max(patterns.max.user)
    .messages(templatesMsgJoi('Username').textRules),
  userSurname: Joi.string()
    .description('Прізвище користувача')
    .note('input')
    .example('Введіть прізвище користувача')
    .min(patterns.min.user)
    .max(patterns.max.user)
    .messages(templatesMsgJoi('Surname of user').textRules),
  email: Joi.string()
    .description('Електронна адреса')
    .note('input')
    .example('Введіть електронну адресу користувача')
    .tag('unique')
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .messages(templatesMsgJoi('Email').emailRules),
  phone: Joi.string()
    .description('Телефон')
    .note('input')
    .example('Введіть телефон користувача')
    .tag('unique')
    .pattern(patterns.phonePattern)
    .messages(
      templatesMsgJoi('Phone', patterns.phonePatternMessage).regExpRules,
    ),
  role: Joi.string()
    .description('Роль користувача')
    .note('select')
    .example('Введіть роль користувача')
    .valid(...patterns.roles)
    .messages(templatesMsgJoi('Role', patterns.roles).enumRules),
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
      ...templatesMsgJoi('Email').emailRules,
      ...templatesMsgJoi('Email').commonRules,
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
      ...templatesMsgJoi('Password', patterns.passwordPatternMessage)
        .regExpRules,
      ...templatesMsgJoi('Password').commonRules,
    }),
  password2: Joi.string()
    .description('Пароль')
    .note('input')
    .example('Введіть пароль ще раз')
    .valid(Joi.ref('password1'))
    .required()
    .messages({
      'any.only': 'Confirmation of password must match',
    }),
});

// ====================================================
const userSchema = new Schema(
  {
    username: {
      type: String,
      default: 'Anonymous',
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
      required: [
        true,
        'The phone is required. Please provide a phone for user',
      ],
    },
    password: {
      type: String,
      match: patterns.passwordPattern,
      required: [true, 'The password is required. Set it for user'],
    },
    role: {
      type: String,
      enum: patterns.roles,
      default: 'user',
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
};
