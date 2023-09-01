const { filterNullProperties } = require('./filterNullProperties');
const { validationRules } = require('./validationRules');

module.exports = schema => {
  return schema.$_terms.keys.map(keyObj => {
    const schema = keyObj.schema;
    const props = {
      type: schema.type,
      rules: schema._rules,
      isRequired: schema._flags.presence,
      isUnique: schema.$_terms.tags,
      description: schema._flags.description,
      messages: schema._preferences?.messages,
    };

    const validation = validationRules(props);

    const topLevelProperties = {
      key: keyObj.key,
      title: props.description,
      type: schema.$_terms.notes[0],
      placeholder: schema.$_terms.examples[0],
      list: schema._valids ? [...schema._valids._values] : null,
      validation: filterNullProperties(validation),
    };

    return filterNullProperties(topLevelProperties);
  });
};

// const processProperty = propertyObj => {
//   const schema = propertyObj.schema;
//   const rules = schema._rules;
//   const messages = schema._preferences && schema._preferences.messages;

//   let length = null;
//   if (schema.type === 'string') {
//     length =
//       messages && messages['string.min'] && messages['string.max']
//         ? messages['string.min']._template[0] +
//           rules[0].args.limit +
//           messages['string.max']._template[0] +
//           rules[1].args.limit +
//           messages['string.max']._template[2]
//         : null;
//   } else if (schema.type === 'number') {
//     length =
//       messages && messages['number.min'] && messages['number.max']
//         ? messages['number.min']._template[0] +
//           rules[0].args.limit +
//           messages['number.max']._template[0] +
//           rules[1].args.limit +
//           messages['number.max']._template[2]
//         : null;
//   }

//   const validation = {
//     regexp: getPatternFromRules(rules, 'pattern'),
//     required: schema._flags.presence === 'required' || null,
//     min: getRuleLimit(rules, 'min'),
//     max: getRuleLimit(rules, 'max'),
//     unique: schema.$_terms.tags.includes('unique') || null,
//     warningMessages: filterNullProperties({
//       regexp:
//         messages && messages['string.pattern.base']
//           ? messages['string.pattern.base'].rendered
//           : null,
//       length,
//       required:
//         messages && messages['any.required']
//           ? messages['any.required'].rendered
//           : null,
//       unique: schema.$_terms.tags.includes('unique')
//         ? templatesMsgJoi(schema._flags.description).uniqueRules
//         : null,
//     }),
//   };

//   const topLevelProperties = {
//     key: propertyObj.key,
//     title: schema._flags.description,
//     type: schema.$_terms.notes[0],
//     placeholder:
//       schema.$_terms.examples && schema.$_terms.examples.length > 0
//         ? schema.$_terms.examples[0]
//         : null,
//     list: schema._valids ? [...schema._valids._values] : null,
//     validation: filterNullProperties(validation),
//   };

//   if (schema.$_terms.keys) {
//     topLevelProperties.options = schema.$_terms.keys.map(processProperty);
//   }

//   return filterNullProperties(topLevelProperties);
// };

// const processSchema = schema => {
//   return schema.$_terms.keys.map(processProperty);
// };

// module.exports = schema => {
//   return processSchema(schema);
// };
