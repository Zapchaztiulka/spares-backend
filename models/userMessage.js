const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  handleMongooseError,
  patterns,
  templatesMsgJoi,
} = require('../helpers');

const validationAddUserMessage = Joi.object({
  phone: Joi.string()
    .description('Телефон користувача')
    .note('input')
    .example('Введіть телефон користувача')
    .allow('')
    .pattern(patterns.phonePattern)
    .messages(
      templatesMsgJoi('Телефон', patterns.phonePatternMessage).regExpRules,
    ),
  email: Joi.string()
    .description('Електронна адреса')
    .note('input')
    .example('Введіть електронну адресу користувача')
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .messages(templatesMsgJoi('Електронна адреса').emailRules),
  type: Joi.string()
    .description('Тип заявки')
    .note('select')
    .example('Оберіть тип заявки')
    .valid(...patterns.typeUserApplication)
    .required()
    .messages({
      ...templatesMsgJoi('Тип заявки', patterns.typeUserApplication).enumRules,
      ...templatesMsgJoi('Тип заявки').commonRules,
    }),
  status: Joi.string()
    .description('Статус заявки')
    .note('select')
    .example('Оберіть статус заявки')
    .valid(...patterns.statusUserApplication)
    .messages(
      templatesMsgJoi('Статус заявки', patterns.statusUserApplication)
        .enumRules,
    ),
  userMessageDetails: Joi.string()
    .description('Деталі заявки')
    .note('input')
    .example('Введіть деталі заявки')
    .min(patterns.min.description)
    .max(patterns.max.description)
    .required()
    .messages({
      ...templatesMsgJoi('Деталі заявки').textRules,
      ...templatesMsgJoi('Деталі заявки').commonRules,
    }),
});

const validationUpdateUserMessage = Joi.object({
  userMessageIds: Joi.array()
    .items(
      Joi.string()
        .description('ІД заявки користувачів')
        .note('checkBox')
        .example('Оберіть ІД заявки користувачів')
        .length(24)
        .messages({
          ...templatesMsgJoi('ІД заявки користувачів').textRules,
          ...templatesMsgJoi('ІД заявки користувачів').commonRules,
        }),
    )
    .min(1)
    .messages(templatesMsgJoi('Масив ІД заявок користувачів').arrayRules),
  type: Joi.string()
    .description('Тип заявки')
    .note('select')
    .example('Оберіть тип заявки')
    .valid(...patterns.typeUserApplication)
    .messages({
      ...templatesMsgJoi('Тип заявки', patterns.typeUserApplication).enumRules,
      ...templatesMsgJoi('Тип заявки').commonRules,
    }),
  status: Joi.string()
    .description('Статус заявки')
    .note('select')
    .example('Оберіть статус заявки')
    .valid(...patterns.statusUserApplication)
    .messages({
      ...templatesMsgJoi('Статус заявки', patterns.statusUserApplication)
        .enumRules,
      ...templatesMsgJoi('Статус заявки').commonRules,
    }),
  adminComment: Joi.string()
    .description('Коментар від менеджера')
    .note('input')
    .example('Введіть коментар від менеджера')
    .min(patterns.min.answer)
    .max(patterns.max.answer)
    .messages({
      ...templatesMsgJoi('Коментар від менеджера').textRules,
      ...templatesMsgJoi('Коментар від менеджера').commonRules,
    }),
});

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
    timestamps: true,
    _id: false,
  },
);

const userMessageSchema = new Schema(
  {
    phone: {
      type: String,
      match: patterns.phonePattern,
      default: '',
    },
    email: {
      type: String,
      match: patterns.emailPattern,
      default: '',
    },
    type: {
      type: String,
      enum: patterns.typeUserApplication,
      required: [
        true,
        'Type of user message is required. Please provide a type',
      ],
    },
    status: {
      type: String,
      enum: patterns.statusUserApplication,
      default: patterns.statusUserApplication[0],
    },
    userMessageDetails: {
      type: String,
      required: [
        true,
        'User message is required. Please provide a user message',
      ],
    },
    adminData: {
      type: adminDataSchema,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

userMessageSchema.post('save', handleMongooseError);
const UserMessage = model('user_message', userMessageSchema);

module.exports = {
  UserMessage,
  validationAddUserMessage,
  validationUpdateUserMessage,
};
