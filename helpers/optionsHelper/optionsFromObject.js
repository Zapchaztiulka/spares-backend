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

    let min = '';
    if (schema.type === 'string') {
      min = schema._preferences.messages['string.min']
        ? schema._preferences.messages['string.min']._template[0] +
          schema._rules[0].args.limit +
          schema._preferences.messages['string.min']._template[2]
        : '';
    } else if (schema.type === 'number') {
      min = schema._preferences.messages['number.min']
        ? schema._preferences.messages['number.min']._template[0] +
          schema._rules[0].args.limit +
          schema._preferences.messages['number.min']._template[2]
        : '';
    }

    let max = '';
    if (schema.type === 'string') {
      max = schema._preferences.messages['string.max']
        ? schema._preferences.messages['string.max']._template[0] +
          schema._rules[1].args.limit +
          schema._preferences.messages['string.max']._template[2]
        : '';
    } else if (schema.type === 'number') {
      max = schema._preferences.messages['number.max']
        ? schema._preferences.messages['number.max']._template[0] +
          schema._rules[1].args.limit +
          schema._preferences.messages['number.max']._template[2]
        : '';
    }

    const validation = {
      regexp: getPatternFromRules(schema._rules, 'pattern'),
      required: schema._flags.presence === 'required',
      min: schema._rules.find(rule => rule.name === 'min')?.args.limit,
      max: schema._rules.find(rule => rule.name === 'max')?.args.limit,
      unique: schema.$_terms.tags.includes('unique'),
      enum: schema._valids ? [...schema._valids._values] : false,
      warningMessages: {
        regexp: schema._preferences.messages['string.pattern.base']
          ? schema._preferences.messages['string.pattern.base'].rendered
          : '',
        min,
        max,
        required: schema._preferences.messages['any.required']
          ? schema._preferences.messages['any.required'].rendered
          : '',
        unique: schema.$_terms.tags.includes('unique')
          ? `${keyObj.key} is unique. Please change it`
          : '',
        enum: schema._preferences.messages['any.only']
          ? schema._preferences.messages['any.only'].rendered
          : '',
      },
    };

    return {
      key: keyObj.key,
      title: schema._flags.description,
      type: schema.$_terms.notes[0],
      placeholder: schema.$_terms.examples[0],
      validation,
    };
  });
};
