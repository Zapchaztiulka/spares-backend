module.exports = (key, data) => {
  const commonRules = {
    'any.required': `${key} is required`,
    'any.empty': `${key} cannot be empty`,
  };

  const textRules = {
    'string.empty': `${key} cannot be empty`,
    'string.min': `${key} should have from {#limit}`,
    'string.max': ' to {#limit} characters',
  };

  const urlRules = {
    'string.empty': `${key} cannot be empty`,
    'string.uri': `Invalid URL format for ${key}`,
  };

  const emailRules = {
    'string.empty': `${key} cannot be empty`,
    'string.email': `${key} must be a valid email`,
  };

  const regExpRules = {
    'string.pattern.base': `${key} ${data}`,
  };

  const numberRules = {
    'number.base': `Invalid type for ${key}, must be a number`,
    'number.min': `${key} should be greater than or equal {#limit} `,
    'number.max': ' and less than or equal to {#limit}',
    'number.positive': `${key} must be a positive number`,
  };

  const integerNumberRules = {
    'number.integer': `${key} must be an integer`,
  };

  const enumRules = {
    'any.only': `${key} must equal one of certain values: ${data}`,
  };

  const arrayRules = {
    'array.base': `${key} must be an array`,
    'array.min': `${key} should have a minimum {#limit} items`,
  };

  return {
    commonRules,
    textRules,
    urlRules,
    emailRules,
    regExpRules,
    numberRules,
    integerNumberRules,
    arrayRules,
    enumRules,
  };
  // return {
  //   'string.empty': `${credential} cannot be an empty`,
  //   'any.required': `missing required field ${credential}`,
  //   'string.min': `${credential} should have a minimum length of {#limit}`,
  //   'string.max': `${credential} should have a maximum length of {#limit}`,
  //   'string.pattern.base': `invalid ${credential}, please provide a valid ${credential}`,
  //   'string.uri': `Invalid URL format for ${credential}`,
  //   'number.base': `Invalid type for ${credential}`,
  //   'number.min': `${credential} should be greater than or equal to {#limit}`,
  //   'number.max': `${credential} should be less than or equal to {#limit}`,
  //   'any.only': `${credential} must equal one of certain values: ${others}`,
  //   'array.min': `${credential} must contain at least one element`,
  // };
};
