const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  handleMongooseError,
  patterns,
  templatesMsgJoi,
} = require('../helpers');

const validationAuthUser = Joi.object({
  username: Joi.string()
    .max(32)
    .description('Max length of username must be no more than 32 characters')
    .messages(templatesMsgJoi('Username')),
  userSurname: Joi.string()
    .max(32)
    .description('Max length of username must be no more than 32 characters')
    .messages(templatesMsgJoi('User surname')),
  password: Joi.string()
    .pattern(patterns.passwordPattern)
    .description(
      'Passwords must be 6 and more characters, at least one lowercase and one uppercase letter',
    )
    .required()
    .messages(templatesMsgJoi('Password')),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .description('Email must be valid')
    .required()
    .messages(templatesMsgJoi('Email')),
  phone: Joi.string()
    .pattern(patterns.phonePattern)
    .description('The phone must start with "0" and contains 10 digits')
    .messages(templatesMsgJoi('Phone')),
  role: Joi.string()
    .valid(...patterns.roles)
    .description(`The role must equal one of certain values:${patterns.roles}`)
    .messages(templatesMsgJoi('Role', patterns.roles)),
});

const validationUpdateUser = Joi.object({
  username: Joi.string()
    .max(32)
    .description('Max length of username must be no more than 32 characters')
    .messages(templatesMsgJoi('Username')),
  userSurname: Joi.string()
    .max(32)
    .description('Max length of username must be no more than 32 characters')
    .messages(templatesMsgJoi('User surname')),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .description('Email must be valid')
    .messages(templatesMsgJoi('Email')),
  phone: Joi.string()
    .pattern(patterns.phonePattern)
    .description('The phone must start with "0" and contains 10 digits')
    .messages(templatesMsgJoi('Phone')),
  role: Joi.string()
    .valid(...patterns.roles)
    .description(`The role must equal one of certain values:${patterns.roles}`)
    .messages(templatesMsgJoi('Role', patterns.roles)),
});

const validationEmailUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .description('Email must be valid')
    .required()
    .messages(templatesMsgJoi('Email')),
});

const validationPasswordUser = Joi.object({
  password1: Joi.string()
    .pattern(patterns.passwordPattern)
    .description(
      'Passwords must be 6 and more characters, at least one lowercase and one uppercase letter',
    )
    .required(),
  password2: Joi.string()
    .valid(Joi.ref('password1'))
    .description('Confirmation of password must match')
    .required(),
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
