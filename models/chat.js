const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  handleMongooseError,
  templatesMsgJoi,
  patterns,
} = require('../helpers');

const validationUserId = Joi.object({
  userId: Joi.string()
    .description('ІД користувача')
    .note('input')
    .example('Введіть ІД користувача')
    .length(24)
    .required()
    .messages(templatesMsgJoi('ІД користувача').textRules),
});

const validationAddMessage = Joi.object({
  userId: Joi.string()
    .description('ІД користувача')
    .note('input')
    .example('Введіть ІД користувача')
    .length(24)
    .required()
    .messages(templatesMsgJoi('ІД користувача').textRules),
  message: Joi.object({
    messageOwner: Joi.string()
      .description('Ініціатор повідомлення')
      .note('input')
      .example('Введіть ініціатора повідомлення')
      .required()
      .valid(...patterns.roles)
      .messages({
        ...templatesMsgJoi('Ініціатор повідомлення').commonRules,
        ...templatesMsgJoi('Ініціатор повідомлення').enumRules,
      }),
    messageType: Joi.string()
      .description('Тип повідомлення')
      .note('input')
      .example('Введіть тип повідомлення')
      .required()
      .valid(...patterns.messageType)
      .messages({
        ...templatesMsgJoi('Тип повідомлення').textRules,
        ...templatesMsgJoi('Тип повідомлення').enumRules,
      }),
    messageText: Joi.string()
      .description('Повідомлення')
      .note('input')
      .example('Введіть повідомлення')
      .min(patterns.min.question)
      .max(patterns.max.question)
      .required()
      .messages({
        ...templatesMsgJoi('Повідомлення').textRules,
        ...templatesMsgJoi('Повідомлення').commonRules,
      }),
  })
    .required()
    .messages(templatesMsgJoi("Об'єкт повідомлення").commonRules),
});

const validationConnectManager = Joi.object({
  userId: Joi.string()
    .description('ІД користувача')
    .note('input')
    .example('Введіть ІД користувача')
    .length(24)
    .required()
    .messages(templatesMsgJoi('ІД користувача').textRules),
  managerId: Joi.string()
    .description('ІД менеджера')
    .note('input')
    .example('Введіть ІД менеджера')
    .length(24)
    .messages(templatesMsgJoi('ІД менеджера').textRules),
  managerName: Joi.string()
    .description("Ім'я менеджера")
    .note('input')
    .example("Введіть ім'я менеджера")
    .allow('')
    .min(patterns.min.user)
    .max(patterns.max.user)
    .messages(templatesMsgJoi("Ім'я менеджера").textRules),
  managerSurname: Joi.string()
    .description('Прізвище менеджера')
    .note('input')
    .example('Введіть прізвище менеджера')
    .allow('')
    .min(patterns.min.user)
    .max(patterns.max.user)
    .messages(templatesMsgJoi('Прізвище менеджера').textRules),
});

const messageSchema = new Schema(
  {
    messageOwner: {
      type: String,
      enum: patterns.roles,
      required: [true, 'The owner of message is required'],
    },
    messageType: {
      type: String,
      enum: patterns.messageType,
      required: [true, 'The type of message is required'],
    },
    messageText: {
      type: String,
      required: [true, 'The message is required'],
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
  },
);

const chatRoomSchema = new Schema(
  {
    userId: {
      type: String,
      default: '',
    },
    managerId: {
      type: String,
      default: '',
    },
    managerName: {
      type: String,
      default: '',
    },
    managerSurname: {
      type: String,
      default: '',
    },
    messages: [messageSchema],
    chatRoomStatus: {
      type: String,
      enum: patterns.chatRoomStatus,
      default: patterns.chatRoomStatus[0],
    },
    chatRoomRating: {
      type: Number,
      enum: patterns.chatRating,
      default: null,
    },
    chatRoomFeedback: {
      type: String,
      default: '',
    },
    isChatRoomOpen: {
      type: Boolean,
      default: false,
    },
    isChatRoomProcessed: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

const chatSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
    },
    username: {
      type: String,
      default: '',
    },
    userSurname: {
      type: String,
      default: '',
    },
    userPhone: {
      type: String,
      default: '',
    },
    token: {
      type: String,
      default: null,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    chatRooms: [chatRoomSchema],
  },
  { versionKey: false, timestamps: true },
);

chatSchema.post('save', handleMongooseError);
const Chat = model('chat', chatSchema);

module.exports = {
  Chat,
  validationUserId,
  validationAddMessage,
  validationConnectManager,
};
