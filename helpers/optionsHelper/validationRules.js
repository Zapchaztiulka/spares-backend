const { filterNullProperties } = require('./filterNullProperties');
const { getPatternFromRules } = require('./getPatternFromRules');
const { getRuleLimit } = require('./getRuleLimit');
const { templatesMsgJoi } = require('../../helpers');

function validationRules({
  type,
  rules,
  isRequired,
  isUnique,
  description,
  messages,
}) {
  let length = null;
  if (type === 'string') {
    length =
      messages['string.min'] && messages['string.max']
        ? messages['string.min']._template[0] +
          rules[0].args.limit +
          ' до ' +
          rules[1].args.limit +
          messages['string.max']._template[2]
        : null;
  } else if (type === 'number') {
    length =
      messages['number.min'] && messages['number.max']
        ? messages['number.min']._template[0] +
          rules[0].args.limit +
          ' та ≤ ' +
          rules[1].args.limit +
          messages['number.max']._template[2]
        : null;
  }

  const validation = {
    regexp: getPatternFromRules(rules, 'pattern'),
    required: isRequired === 'required' || null,
    min: getRuleLimit(rules, 'min'),
    max: getRuleLimit(rules, 'max'),
    unique: isUnique.includes('unique') || null,
    warningMessages: filterNullProperties({
      regexp: messages['string.pattern.base']
        ? messages['string.pattern.base'].rendered
        : null,
      length,
      required: messages['any.required']
        ? messages['any.required'].rendered
        : null,
      unique: isUnique.includes('unique')
        ? templatesMsgJoi(description).uniqueRules
        : null,
    }),
  };

  return validation;
}

module.exports = { validationRules };
