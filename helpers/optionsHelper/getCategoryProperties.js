module.exports = (schema, typeReq) => {
  const keys = schema.$_terms.keys;

  const options = [
    typeReq === 'add'
      ? {
          key: keys[0].key, // categoryName
          title: keys[0].schema._flags.description,
          type: keys[0].schema.$_terms.notes[0],
          placeholder: keys[0].schema.$_terms.examples[0],
          validation: {
            min: keys[0].schema._rules[0].args.limit,
            max: keys[0].schema._rules[1].args.limit,
            required: keys[0].schema._flags.presence,
            warningMessages: {
              length:
                keys[0].schema._preferences.messages['string.min']
                  ._template[0] +
                keys[0].schema._rules[0].args.limit +
                ' до ' +
                keys[0].schema._rules[1].args.limit +
                keys[0].schema._preferences.messages['string.max']._template[
                  keys[0].schema._preferences.messages['string.max']._template
                    .length - 1
                ],
              required:
                keys[0].schema._preferences.messages['any.required'].rendered,
            },
          },
        }
      : {
          key: keys[0].key, // categoryName
          title: keys[0].schema._flags.description,
          type: keys[0].schema.$_terms.notes[0],
          placeholder: keys[0].schema.$_terms.examples[0],
          validation: {
            min: keys[0].schema._rules[0].args.limit,
            max: keys[0].schema._rules[1].args.limit,
            warningMessages: {
              length:
                keys[0].schema._preferences.messages['string.min']
                  ._template[0] +
                keys[0].schema._rules[0].args.limit +
                ' до ' +
                keys[0].schema._rules[1].args.limit +
                keys[0].schema._preferences.messages['string.max']._template[
                  keys[0].schema._preferences.messages['string.max']._template
                    .length - 1
                ],
            },
          },
        },
    {
      key: keys[1].schema.$_terms.items[0].$_terms.keys[0].key, // subcategoryName
      title:
        keys[1].schema.$_terms.items[0].$_terms.keys[0].schema._flags
          .description,
      type: keys[1].schema.$_terms.items[0].$_terms.keys[0].schema.$_terms
        .notes[0],
      placeholder:
        keys[1].schema.$_terms.items[0].$_terms.keys[0].schema.$_terms
          .examples[0],
      validation: {
        min: keys[1].schema.$_terms.items[0].$_terms.keys[0].schema._rules[0]
          .args.limit,
        max: keys[1].schema.$_terms.items[0].$_terms.keys[0].schema._rules[1]
          .args.limit,
        warningMessages: {
          length:
            keys[1].schema.$_terms.items[0].$_terms.keys[0].schema._preferences
              .messages['string.min']._template[0] +
            keys[1].schema.$_terms.items[0].$_terms.keys[0].schema._rules[0]
              .args.limit +
            ' до ' +
            keys[1].schema.$_terms.items[0].$_terms.keys[0].schema._rules[1]
              .args.limit +
            keys[1].schema.$_terms.items[0].$_terms.keys[0].schema._preferences
              .messages['string.max']._template[
              keys[1].schema.$_terms.items[0].$_terms.keys[0].schema
                ._preferences.messages['string.max']._template.length - 1
            ],
        },
      },
    },
  ];

  return options;
};
