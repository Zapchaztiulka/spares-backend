const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  handleMongooseError,
  patterns,
  templatesMsgJoi,
} = require('../helpers');

const validationRequest = Joi.object({
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
  productId: Joi.string()
    .description('Product ID')
    .note('input')
    .example('Введіть product ID')
    .length(24)
    .required()
    .messages(templatesMsgJoi('Product ID').commonRules),
});

const userRequestSchema = new Schema(
  {
    email: {
      type: String,
      match: patterns.emailPattern,
      required: [
        true,
        'The email is required. Please provide an email address',
      ],
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: [true, 'The productId is required. Please provide a productId'],
    },
  },
  { versionKey: false, timestamps: { createdAt: true, updatedAt: false } },
);

userRequestSchema.post('save', handleMongooseError);
const UserRequest = model('user_request', userRequestSchema);

module.exports = {
  UserRequest,
  validationRequest,
};
