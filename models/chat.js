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
    .required()
    .messages(templatesMsgJoi('ІД користувача').textRules),
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
    managerId: {
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
};
