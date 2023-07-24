const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  handleMongooseError,
  patterns,
  templatesMsgJoi,
} = require('../helpers');

const validationAuthUser = Joi.object({
  username: Joi.string().max(32).messages(templatesMsgJoi('Username')),
  userSurname: Joi.string().max(32).messages(templatesMsgJoi('User surname')),
  password: Joi.string()
    .pattern(patterns.passwordPattern)
    .required()
    .messages(templatesMsgJoi('Password')),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .required()
    .messages(templatesMsgJoi('Email')),
  role: Joi.string()
    .valid(...patterns.roles)
    .messages(templatesMsgJoi('Role', patterns.roles)),
});

const validationUpdateUser = Joi.object({
  username: Joi.string().max(32).messages(templatesMsgJoi('Username')),
  userSurname: Joi.string().max(32).messages(templatesMsgJoi('User surname')),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .messages(templatesMsgJoi('Email')),
  role: Joi.string()
    .valid(...patterns.roles)
    .messages(templatesMsgJoi('Role', patterns.roles)),
});

const validationEmailUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .required()
    .messages(templatesMsgJoi('Email')),
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
    password: {
      type: String,
      match: patterns.passwordPattern,
      required: [true, 'The password is required. Set it for user'],
    },
    role: {
      type: String,
      enum: patterns.roles,
      default: 'public',
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
};
