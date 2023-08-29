// function getPatternFromRules(rules, ruleName) {
//   const rule = rules.find(rule => rule.name === ruleName);
//   if (rule && rule.method === 'pattern' && rule.args.regex) {
//     return rule.args.regex.source;
//   }
//   return null;
// }

// module.exports = schema => {
//   return schema.$_terms.keys.map(keyObj => {
//     const schema = keyObj.schema;

//     let length = '';
//     if (schema.type === 'string') {
//       length =
//         schema._preferences.messages['string.min'] &&
//         schema._preferences.messages['string.max']
//           ? schema._preferences.messages['string.min']._template[0] +
//             schema._rules[0].args.limit +
//             schema._preferences.messages['string.max']._template[0] +
//             schema._rules[1].args.limit +
//             schema._preferences.messages['string.max']._template[2]
//           : '';
//     } else if (schema.type === 'number') {
//       length =
//         schema._preferences.messages['number.min'] &&
//         schema._preferences.messages['number.max']
//           ? schema._preferences.messages['number.min']._template[0] +
//             schema._rules[0].args.limit +
//             schema._preferences.messages['number.max']._template[0] +
//             schema._rules[1].args.limit +
//             schema._preferences.messages['number.max']._template[2]
//           : '';
//     }

//     const validation = {
//       regexp: getPatternFromRules(schema._rules, 'pattern') || null,
//       required: schema._flags.presence === 'required' || null,
//       min: schema._rules.find(rule => rule.name === 'min')?.args.limit || null,
//       max: schema._rules.find(rule => rule.name === 'max')?.args.limit || null,
//       unique: schema.$_terms.tags.includes('unique') || null,
//       warningMessages: {
//         regexp: schema._preferences.messages['string.pattern.base']
//           ? schema._preferences.messages['string.pattern.base'].rendered
//           : null,
//         length,
//         required: schema._preferences.messages['any.required']
//           ? schema._preferences.messages['any.required'].rendered
//           : null,
//         unique: schema.$_terms.tags.includes('unique')
//           ? `${keyObj.key} is unique. Please change it`
//           : null,
//       },
//     };

//     return {
//       key: keyObj.key,
//       title: schema._flags.description,
//       type: schema.$_terms.notes[0],
//       placeholder: schema.$_terms.examples[0],
//       validation,
//     };
//   });
// };

function getPatternFromRules(rules, ruleName) {
  const rule = rules.find(rule => rule.name === ruleName);
  if (rule && rule.method === 'pattern' && rule.args.regex) {
    return rule.args.regex.source;
  }
  return null;
}

module.exports = schema => {
  return schema.$_terms.keys.map(keyObj => {
    const schema = keyObj.schema;

    let length = null;
    if (schema.type === 'string') {
      length =
        schema._preferences.messages['string.min'] &&
        schema._preferences.messages['string.max']
          ? schema._preferences.messages['string.min']._template[0] +
            schema._rules[0].args.limit +
            schema._preferences.messages['string.max']._template[0] +
            schema._rules[1].args.limit +
            schema._preferences.messages['string.max']._template[2]
          : null;
    } else if (schema.type === 'number') {
      length =
        schema._preferences.messages['number.min'] &&
        schema._preferences.messages['number.max']
          ? schema._preferences.messages['number.min']._template[0] +
            schema._rules[0].args.limit +
            schema._preferences.messages['number.max']._template[0] +
            schema._rules[1].args.limit +
            schema._preferences.messages['number.max']._template[2]
          : null;
    }

    const validation = {
      regexp: getPatternFromRules(schema._rules, 'pattern') || null,
      required: schema._flags.presence === 'required' || null,
      min: schema._rules.find(rule => rule.name === 'min')?.args.limit || null,
      max: schema._rules.find(rule => rule.name === 'max')?.args.limit || null,
      unique: schema.$_terms.tags.includes('unique') || null,
      // Omitting properties with null values from warningMessages
      warningMessages: Object.fromEntries(
        Object.entries({
          regexp: schema._preferences.messages['string.pattern.base']
            ? schema._preferences.messages['string.pattern.base'].rendered
            : null,
          length,
          required: schema._preferences.messages['any.required']
            ? schema._preferences.messages['any.required'].rendered
            : null,
          unique: schema.$_terms.tags.includes('unique')
            ? `${keyObj.key} is unique. Please change it`
            : null,
        }).filter(([_, value]) => value !== null),
      ),
    };

    // Omitting validation and warningMessages properties with null values
    const filteredValidation = Object.fromEntries(
      Object.entries(validation).filter(([_, value]) => value !== null),
    );

    return {
      key: keyObj.key,
      title: schema._flags.description,
      type: schema.$_terms.notes[0],
      placeholder: schema.$_terms.examples[0],
      validation:
        Object.keys(filteredValidation).length > 0 ? filteredValidation : null,
    };
  });
};
