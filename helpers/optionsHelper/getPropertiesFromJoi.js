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
