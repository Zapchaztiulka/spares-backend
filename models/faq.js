const { Schema, model } = require('mongoose');
const Joi = require('joi');

const {
  templatesMsgJoi,
  handleMongooseError,
  patterns,
} = require('../helpers');

const validationAddQuestionGroup = Joi.object({
  questionGroup: Joi.string()
    .description('Група запитань')
    .note('input')
    .example('Введіть групу запитань')
    .min(patterns.min.questionGroup)
    .max(patterns.max.questionGroup)
    .required()
    .messages({
      ...templatesMsgJoi('Група запитань').commonRules,
      ...templatesMsgJoi('Група запитань').textRules,
    }),
  isShowInChat: Joi.boolean()
    .description('Відображення групи запитань у чаті')
    .note('checkBox')
    .example('Чи відображати групу запитань у чаті?')
    .messages(
      templatesMsgJoi('Відображення групи запитань у чаті').booleanRules,
    ),
});

const validationUpdateQuestionGroup = Joi.object({
  questionGroup: Joi.string()
    .description('Група запитань')
    .note('input')
    .example('Введіть групу запитань')
    .min(patterns.min.questionGroup)
    .max(patterns.max.questionGroup)
    .messages({
      ...templatesMsgJoi('Група запитань').commonRules,
      ...templatesMsgJoi('Група запитань').textRules,
    }),
  isShowInChat: Joi.boolean()
    .description('Відображення групи запитань у чаті')
    .note('checkBox')
    .example('Чи відображати групу запитань у чаті?')
    .messages(
      templatesMsgJoi('Відображення групи запитань у чаті').booleanRules,
    ),
});

const validationAddFAQ = Joi.array().items(
  Joi.object({
    question: Joi.string()
      .description('Запитання')
      .note('input')
      .example('Введіть запитання')
      .min(patterns.min.question)
      .max(patterns.max.question)
      .required()
      .messages({
        ...templatesMsgJoi('Запитання').commonRules,
        ...templatesMsgJoi('Запитання').textRules,
      }),
    answer: Joi.string()
      .description('Відповідь на запитання')
      .note('input')
      .example('Введіть відповідь на запитання')
      .min(patterns.min.question)
      .max(patterns.max.question)
      .required()
      .messages({
        ...templatesMsgJoi('Відповідь на запитання').commonRules,
        ...templatesMsgJoi('Відповідь на запитання').textRules,
      }),
    answerImages: Joi.array().items(
      Joi.object({
        url: Joi.string()
          .description('Зображення для відповіді')
          .note('input')
          .example('Завантажте зображення для відповіді')
          .uri()
          .required()
          .messages({
            ...templatesMsgJoi('URL фото').urlRules,
            ...templatesMsgJoi('URL фото').commonRules,
          }),
        alt: Joi.string()
          .description('Опис зображення для відповіді')
          .note('input')
          .example('Введіть опис зображення для відповіді')
          .min(patterns.min.alt)
          .max(patterns.max.alt)
          .required()
          .messages({
            ...templatesMsgJoi('Опис зображення для відповіді').textRules,
            ...templatesMsgJoi('Опис зображення для відповіді').commonRules,
          }),
      }).messages(templatesMsgJoi('Масив зображень для відповіді').arrayRules),
    ),
    isShowInChat: Joi.boolean()
      .description('Відображення запитання у чаті')
      .note('checkBox')
      .example('Чи відображати запитання у чаті?')
      .messages(templatesMsgJoi('Відображення запитання у чаті').booleanRules),
  })
    .required()
    .messages({
      ...templatesMsgJoi('Масив запитань').arrayRules,
      ...templatesMsgJoi('Масив запитань').commonRules,
    }),
);

const validationUpdateFAQ = Joi.object({
  question: Joi.string()
    .description('Запитання')
    .note('input')
    .example('Введіть запитання')
    .min(patterns.min.question)
    .max(patterns.max.question)
    .messages(templatesMsgJoi('Запитання').textRules),
  answer: Joi.string()
    .description('Відповідь на запитання')
    .note('input')
    .example('Введіть відповідь на запитання')
    .min(patterns.min.question)
    .max(patterns.max.question)
    .messages(templatesMsgJoi('Запитання').textRules),
  answerImages: Joi.array().items(
    Joi.object({
      url: Joi.string()
        .description('Зображення для відповіді')
        .note('input')
        .example('Завантажте зображення для відповіді')
        .uri()
        .required()
        .messages({
          ...templatesMsgJoi('URL фото').urlRules,
          ...templatesMsgJoi('URL фото').commonRules,
        }),
      alt: Joi.string()
        .description('Опис зображення для відповіді')
        .note('input')
        .example('Введіть опис зображення для відповіді')
        .min(patterns.min.alt)
        .max(patterns.max.alt)
        .required()
        .messages({
          ...templatesMsgJoi('Опис зображення для відповіді').textRules,
          ...templatesMsgJoi('Опис зображення для відповіді').commonRules,
        }),
    }).messages(templatesMsgJoi('Масив зображень для відповіді').arrayRules),
  ),
  isShowInChat: Joi.boolean()
    .description('Відображення запитання у чаті')
    .note('checkBox')
    .example('Чи відображати запитання у чаті?')
    .messages(templatesMsgJoi('Відображення запитання у чаті').booleanRules),
});

const answerImages = new Schema({
  url: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: 'Some image',
  },
});

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  answerImages: [answerImages],
  isShowInChat: {
    type: Boolean,
    default: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

const questionGroupSchema = new Schema(
  {
    questionGroup: {
      type: String,
      required: true,
    },
    isShowInChat: {
      type: Boolean,
      default: true,
    },
    questions: [questionSchema],
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

questionGroupSchema.post('save', handleMongooseError);
const FAQ = model('faq', questionGroupSchema);

module.exports = {
  FAQ,
  validationAddQuestionGroup,
  validationUpdateQuestionGroup,
  validationAddFAQ,
  validationUpdateFAQ,
};
