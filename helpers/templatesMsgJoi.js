module.exports = (credential, others) => {
  return {
    'string.empty': `${credential} cannot be an empty`,
    'any.required': `missing required field ${credential}`,
    'string.min': `${credential} should have a minimum length of {#limit}`,
    'string.max': `${credential} should have a maximum length of {#limit}`,
    'string.pattern.base': `invalid ${credential}, please provide a valid ${credential}`,
    'string.uri': `Invalid URL format for ${credential}`,
    'number.base': `Invalid type for ${credential}`,
    'number.min': `${credential} should be greater than or equal to {#limit}`,
    'number.max': `${credential} should be less than or equal to {#limit}`,
    'any.only': `${credential} must equal one of certain values: ${others}`,
  };
};
