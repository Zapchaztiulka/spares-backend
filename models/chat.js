const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  handleMongooseError,
  templatesMsgJoi,
  patterns,
} = require('../helpers');

const validationCreateChatRoom = Joi.object({
  userId: Joi.string()
    .description('ІД користувача')
    .note('input')
    .example('Введіть ІД користувача')
    .allow('')
    .length(24)
    .messages(templatesMsgJoi('ІД категорії товару').textRules),
  username: Joi.string()
    .description("Ім'я користувача")
    .note('input')
    .example("Введіть ім'я користувача")
    .allow('')
    .min(patterns.min.user)
    .max(patterns.max.user)
    .messages(templatesMsgJoi("Ім'я користувача").textRules),
  userPhone: Joi.string()
    .description('Телефон користувача')
    .note('input')
    .example('Введіть телефон користувача')
    .tag('unique')
    .allow('')
    .pattern(patterns.phonePattern)
    .messages(
      templatesMsgJoi('Телефон', patterns.phonePatternMessage).regExpRules,
    ),
});

const messageSchema = new Schema(
  {
    messageOwner: {
      type: String,
      enum: patterns.roles,
      required: [true, 'The owner of message is required'],
    },
    message: {
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
    username: {
      type: String,
      default: '',
    },
    userPhone: {
      type: String,
      default: '',
    },
    managerId: {
      type: String,
      default: '',
    },
    messages: [messageSchema],
    chatStatus: {
      type: String,
      enum: patterns.chatStatus,
      default: patterns.chatStatus[0],
    },
    chatRating: {
      type: Number,
      enum: patterns.chatRating,
      default: null,
    },
    chatFeedback: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true },
);

chatRoomSchema.post('save', handleMongooseError);
const Chat = model('chat', chatRoomSchema);

module.exports = {
  Chat,
  validationCreateChatRoom,
};
