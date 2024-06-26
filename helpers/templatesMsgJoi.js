module.exports = (key, data) => {
  const commonRules = {
    'any.required': `Поле "${key}" повинне бути заповнене`,
    'any.empty': `Поле "${key}" не може бути порожнім`,
  };

  const textRules = {
    'string.empty': `Поле "${key}" не може бути порожнім`,
    'string.min': `${key} має мати від {#limit} символів`,
    'string.max': `${key} має мати до {#limit} символів`,
    'string.length': `${key} має містити {#limit} символів`,
    'string.digits': `${key} має містити лише цифри`,
  };

  const urlRules = {
    'string.empty': `Поле "${key}" не може бути порожнім`,
    'string.uri': `Недійсний формат URL для ${key}`,
  };

  const emailRules = {
    'string.empty': `Поле "${key}" не може бути порожнім`,
    'string.email': `${key} має бути валідною електронною адресою`,
  };

  const regExpRules = {
    'string.pattern.base': `${key} ${data}`,
  };

  const numberRules = {
    'number.base': `Недійсний тип для поля "${key}", має бути числом`,
    'number.min': `${key} має бути ≥ {#limit}`,
    'number.max': `${key} має бути ≤ {#limit}`,
    'number.positive': `${key} має бути додатним числом`,
  };

  const integerNumberRules = {
    'number.integer': `${key} має бути цілим числом`,
  };

  const enumRules = {
    'any.only': `${key} має дорівнювати одному з наступних значень: ${data}`,
  };

  const arrayRules = {
    'array.base': `${key} має бути масивом`,
    'array.min': `${key} має містити мінімум {#limit} елементів`,
  };

  const uniqueRules = `${key} є унікальним. Будь ласка, змініть його`;

  const booleanRules = {
    'boolean.base': `${key} має бути булевим значенням`,
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
    uniqueRules,
    booleanRules,
  };
};
