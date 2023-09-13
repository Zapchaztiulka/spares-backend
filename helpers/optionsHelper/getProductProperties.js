module.exports = (schema, typeReq) => {
  const keys = schema.$_terms.keys;

  const options = [
    typeReq === 'add'
      ? {
          key: keys[0].key, // name
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
                keys[0].schema._preferences.messages['string.max']
                  ._template[0] +
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
          key: keys[0].key, // name
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
                keys[0].schema._preferences.messages['string.max']
                  ._template[0] +
                keys[0].schema._rules[1].args.limit +
                keys[0].schema._preferences.messages['string.max']._template[
                  keys[0].schema._preferences.messages['string.max']._template
                    .length - 1
                ],
            },
          },
        },
    {
      key: keys[1].key, // vendorCode
      title: keys[1].schema._flags.description,
      type: keys[1].schema.$_terms.notes[0],
      placeholder: keys[1].schema.$_terms.examples[0],
      validation: {
        min: keys[1].schema._rules[0].args.limit,
        max: keys[1].schema._rules[1].args.limit,
        warningMessages: {
          length:
            keys[1].schema._preferences.messages['string.min']._template[0] +
            keys[1].schema._rules[0].args.limit +
            keys[1].schema._preferences.messages['string.max']._template[0] +
            keys[1].schema._rules[1].args.limit +
            keys[1].schema._preferences.messages['string.max']._template[
              keys[1].schema._preferences.messages['string.max']._template
                .length - 1
            ],
        },
      },
    },
    typeReq === 'add'
      ? {
          key: keys[2].key, // price
          title: keys[2].schema._flags.description,
          type: keys[2].schema.$_terms.notes[0],
          placeholder: keys[2].schema.$_terms.examples[0],
          validation: {
            min: keys[2].schema._rules[0].args.limit,
            max: keys[2].schema._rules[1].args.limit,
            required: keys[2].schema._flags.presence,
            warningMessages: {
              length:
                keys[2].schema._preferences.messages['number.min']
                  ._template[0] +
                keys[2].schema._rules[0].args.limit +
                keys[2].schema._preferences.messages['number.max']
                  ._template[0] +
                keys[2].schema._rules[1].args.limit,
              required:
                keys[2].schema._preferences.messages['any.required'].rendered,
            },
          },
        }
      : {
          key: keys[2].schema.$_terms.keys[0].key, // // price - value
          title: keys[2].schema.$_terms.keys[0].schema._flags.description,
          type: keys[2].schema.$_terms.keys[0].schema.$_terms.notes[0],
          placeholder:
            keys[2].schema.$_terms.keys[0].schema.$_terms.examples[0],
          validation: {
            min: keys[2].schema.$_terms.keys[0].schema._rules[0].args.limit,
            max: keys[2].schema.$_terms.keys[0].schema._rules[1].args.limit,
            warningMessages: {
              length:
                keys[2].schema.$_terms.keys[0].schema._preferences.messages[
                  'number.min'
                ]._template[0] +
                keys[2].schema.$_terms.keys[0].schema._rules[0].args.limit +
                keys[2].schema.$_terms.keys[0].schema._preferences.messages[
                  'number.max'
                ]._template[0] +
                keys[2].schema.$_terms.keys[0].schema._rules[1].args.limit,
            },
          },
        },
    typeReq === 'add'
      ? {
          key: keys[3].key, // availability
          title: keys[3].schema._flags.description,
          type: keys[3].schema.$_terms.notes[0],
          placeholder: keys[3].schema.$_terms.examples[0],
          list: [...keys[3].schema._valids._values],
          validation: {
            required: keys[3].schema._flags.presence,
            warningMessages: {
              required:
                keys[3].schema._preferences.messages['any.required'].rendered,
            },
          },
        }
      : {
          key: keys[3].key, // availability
          title: keys[3].schema._flags.description,
          type: keys[3].schema.$_terms.notes[0],
          placeholder: keys[3].schema.$_terms.examples[0],
          list: [...keys[3].schema._valids._values],
          validation: {
            warningMessages: {},
          },
        },
    {
      key: keys[4].key, // weight
      title: keys[4].schema._flags.description,
      type: keys[4].schema.$_terms.notes[0],
      placeholder: keys[4].schema.$_terms.examples[0],
      validation: {
        min: keys[4].schema._rules[0].args.limit,
        max: keys[4].schema._rules[1].args.limit,
        warningMessages: {
          length:
            keys[4].schema._preferences.messages['number.min']._template[0] +
            keys[4].schema._rules[0].args.limit +
            keys[4].schema._preferences.messages['number.max']._template[0] +
            keys[4].schema._rules[1].args.limit,
        },
      },
    },
    {
      key: keys[5].key, // units
      title: keys[5].schema._flags.description,
      type: keys[5].schema.$_terms.notes[0],
      placeholder: keys[5].schema.$_terms.examples[0],
      list: [...keys[5].schema._valids._values],
      validation: {
        warningMessages: {},
      },
    },
    {
      key: keys[6].key, // quantity
      title: keys[6].schema._flags.description,
      type: keys[6].schema.$_terms.notes[0],
      placeholder: keys[6].schema.$_terms.examples[0],
      validation: {
        min: keys[6].schema._rules[0].args.limit,
        max: keys[6].schema._rules[1].args.limit,
        warningMessages: {
          length:
            keys[6].schema._preferences.messages['number.min']._template[0] +
            keys[6].schema._rules[0].args.limit +
            keys[6].schema._preferences.messages['number.max']._template[0] +
            keys[6].schema._rules[1].args.limit,
        },
      },
    },
    typeReq === 'add'
      ? {
          key: keys[7].schema.$_terms.items[0].$_terms.keys[0].key, // photo URL
          title:
            keys[7].schema.$_terms.items[0].$_terms.keys[0].schema._flags
              .description,
          type: keys[7].schema.$_terms.items[0].$_terms.keys[0].schema.$_terms
            .notes[0],
          placeholder:
            keys[7].schema.$_terms.items[0].$_terms.keys[0].schema.$_terms
              .examples[0],
          validation: {
            uri: keys[7].schema.$_terms.items[0].$_terms.keys[0].schema._rules.some(
              rule => rule.method === 'uri',
            ),
            required:
              keys[7].schema.$_terms.items[0].$_terms.keys[0].schema._flags
                .presence,
            warningMessages: {
              uri: keys[7].schema.$_terms.items[0].$_terms.keys[0].schema
                ._preferences.messages['string.uri'].rendered,
              required:
                keys[7].schema.$_terms.items[0].$_terms.keys[0].schema
                  ._preferences.messages['any.required'].rendered,
            },
          },
        }
      : {
          key: keys[7].schema.$_terms.items[0].$_terms.keys[0].key, // photo URL
          title:
            keys[7].schema.$_terms.items[0].$_terms.keys[0].schema._flags
              .description,
          type: keys[7].schema.$_terms.items[0].$_terms.keys[0].schema.$_terms
            .notes[0],
          placeholder:
            keys[7].schema.$_terms.items[0].$_terms.keys[0].schema.$_terms
              .examples[0],
          validation: {
            uri: keys[7].schema.$_terms.items[0].$_terms.keys[0].schema._rules.some(
              rule => rule.method === 'uri',
            ),
            warningMessages: {
              uri: keys[7].schema.$_terms.items[0].$_terms.keys[0].schema
                ._preferences.messages['string.uri'].rendered,
            },
          },
        },
    typeReq === 'add'
      ? {
          key: keys[7].schema.$_terms.items[0].$_terms.keys[1].key, // alt
          title:
            keys[7].schema.$_terms.items[0].$_terms.keys[1].schema._flags
              .description,
          type: keys[7].schema.$_terms.items[0].$_terms.keys[1].schema.$_terms
            .notes[0],
          placeholder:
            keys[7].schema.$_terms.items[0].$_terms.keys[1].schema.$_terms
              .examples[0],
          validation: {
            min: keys[7].schema.$_terms.items[0].$_terms.keys[1].schema
              ._rules[0].args.limit,
            max: keys[7].schema.$_terms.items[0].$_terms.keys[1].schema
              ._rules[1].args.limit,
            required:
              keys[7].schema.$_terms.items[0].$_terms.keys[1].schema._flags
                .presence,
            warningMessages: {
              length:
                keys[7].schema.$_terms.items[0].$_terms.keys[1].schema
                  ._preferences.messages['string.min']._template[0] +
                keys[7].schema.$_terms.items[0].$_terms.keys[1].schema._rules[0]
                  .args.limit +
                keys[7].schema.$_terms.items[0].$_terms.keys[1].schema
                  ._preferences.messages['string.max']._template[0] +
                keys[7].schema.$_terms.items[0].$_terms.keys[1].schema._rules[1]
                  .args.limit +
                keys[7].schema.$_terms.items[0].$_terms.keys[1].schema
                  ._preferences.messages['string.max']._template[
                  keys[7].schema.$_terms.items[0].$_terms.keys[1].schema
                    ._preferences.messages['string.max']._template.length - 1
                ],
              required:
                keys[7].schema.$_terms.items[0].$_terms.keys[1].schema
                  ._preferences.messages['any.required'].rendered,
            },
          },
        }
      : {
          key: keys[7].schema.$_terms.items[0].$_terms.keys[1].key, // alt
          title:
            keys[7].schema.$_terms.items[0].$_terms.keys[1].schema._flags
              .description,
          type: keys[7].schema.$_terms.items[0].$_terms.keys[1].schema.$_terms
            .notes[0],
          placeholder:
            keys[7].schema.$_terms.items[0].$_terms.keys[1].schema.$_terms
              .examples[0],
          validation: {
            min: keys[7].schema.$_terms.items[0].$_terms.keys[1].schema
              ._rules[0].args.limit,
            max: keys[7].schema.$_terms.items[0].$_terms.keys[1].schema
              ._rules[1].args.limit,
            warningMessages: {
              length:
                keys[7].schema.$_terms.items[0].$_terms.keys[1].schema
                  ._preferences.messages['string.min']._template[0] +
                keys[7].schema.$_terms.items[0].$_terms.keys[1].schema._rules[0]
                  .args.limit +
                keys[7].schema.$_terms.items[0].$_terms.keys[1].schema
                  ._preferences.messages['string.max']._template[0] +
                keys[7].schema.$_terms.items[0].$_terms.keys[1].schema._rules[1]
                  .args.limit +
                keys[7].schema.$_terms.items[0].$_terms.keys[1].schema
                  ._preferences.messages['string.max']._template[
                  keys[7].schema.$_terms.items[0].$_terms.keys[1].schema
                    ._preferences.messages['string.max']._template.length - 1
                ],
            },
          },
        },
    {
      key: keys[8].key, // description
      title: keys[8].schema._flags.description,
      type: keys[8].schema.$_terms.notes[0],
      placeholder: keys[8].schema.$_terms.examples[0],
      validation: {
        min: keys[8].schema._rules[0].args.limit,
        max: keys[8].schema._rules[1].args.limit,
        warningMessages: {
          length:
            keys[8].schema._preferences.messages['string.min']._template[0] +
            keys[8].schema._rules[0].args.limit +
            keys[8].schema._preferences.messages['string.max']._template[0] +
            keys[8].schema._rules[1].args.limit +
            keys[8].schema._preferences.messages['string.max']._template[
              keys[8].schema._preferences.messages['string.max']._template
                .length - 1
            ],
        },
      },
    },
    {
      key: keys[9].schema.$_terms.keys[0].key, // country
      title: keys[9].schema.$_terms.keys[0].schema._flags.description,
      type: keys[9].schema.$_terms.keys[0].schema.$_terms.notes[0],
      placeholder: keys[9].schema.$_terms.keys[0].schema.$_terms.examples[0],
      validation: {
        min: keys[9].schema.$_terms.keys[0].schema._rules[0].args.limit,
        max: keys[9].schema.$_terms.keys[0].schema._rules[1].args.limit,
        warningMessages: {
          length:
            keys[9].schema.$_terms.keys[0].schema._preferences.messages[
              'string.min'
            ]._template[0] +
            keys[9].schema.$_terms.keys[0].schema._rules[0].args.limit +
            keys[9].schema.$_terms.keys[0].schema._preferences.messages[
              'string.max'
            ]._template[0] +
            keys[9].schema.$_terms.keys[0].schema._rules[1].args.limit +
            keys[9].schema.$_terms.keys[0].schema._preferences.messages[
              'string.max'
            ]._template[
              keys[9].schema.$_terms.keys[0].schema._preferences.messages[
                'string.max'
              ]._template.length - 1
            ],
        },
      },
    },
    {
      key: keys[9].schema.$_terms.keys[1].key, // factory
      title: keys[9].schema.$_terms.keys[1].schema._flags.description,
      type: keys[9].schema.$_terms.keys[1].schema.$_terms.notes[0],
      placeholder: keys[9].schema.$_terms.keys[1].schema.$_terms.examples[0],
      validation: {
        min: keys[9].schema.$_terms.keys[1].schema._rules[0].args.limit,
        max: keys[9].schema.$_terms.keys[1].schema._rules[1].args.limit,
        warningMessages: {
          length:
            keys[9].schema.$_terms.keys[1].schema._preferences.messages[
              'string.min'
            ]._template[0] +
            keys[9].schema.$_terms.keys[1].schema._rules[0].args.limit +
            keys[9].schema.$_terms.keys[1].schema._preferences.messages[
              'string.max'
            ]._template[0] +
            keys[9].schema.$_terms.keys[1].schema._rules[1].args.limit +
            keys[9].schema.$_terms.keys[1].schema._preferences.messages[
              'string.max'
            ]._template[
              keys[9].schema.$_terms.keys[1].schema._preferences.messages[
                'string.max'
              ]._template.length - 1
            ],
        },
      },
    },
    typeReq === 'add'
      ? {
          key: keys[9].schema.$_terms.keys[2].key, // trademark
          title: keys[9].schema.$_terms.keys[2].schema._flags.description,
          type: keys[9].schema.$_terms.keys[2].schema.$_terms.notes[0],
          placeholder:
            keys[9].schema.$_terms.keys[2].schema.$_terms.examples[0],
          validation: {
            min: keys[9].schema.$_terms.keys[2].schema._rules[0].args.limit,
            max: keys[9].schema.$_terms.keys[2].schema._rules[1].args.limit,
            required: keys[9].schema.$_terms.keys[2].schema._flags.presence,
            warningMessages: {
              length:
                keys[9].schema.$_terms.keys[2].schema._preferences.messages[
                  'string.min'
                ]._template[0] +
                keys[9].schema.$_terms.keys[2].schema._rules[0].args.limit +
                keys[9].schema.$_terms.keys[2].schema._preferences.messages[
                  'string.max'
                ]._template[0] +
                keys[9].schema.$_terms.keys[2].schema._rules[1].args.limit +
                keys[9].schema.$_terms.keys[2].schema._preferences.messages[
                  'string.max'
                ]._template[
                  keys[9].schema.$_terms.keys[2].schema._preferences.messages[
                    'string.max'
                  ]._template.length - 1
                ],
              required:
                keys[9].schema.$_terms.keys[2].schema._preferences.messages[
                  'any.required'
                ].rendered,
            },
          },
        }
      : {
          key: keys[9].schema.$_terms.keys[2].key, // trademark
          title: keys[9].schema.$_terms.keys[2].schema._flags.description,
          type: keys[9].schema.$_terms.keys[2].schema.$_terms.notes[0],
          placeholder:
            keys[9].schema.$_terms.keys[2].schema.$_terms.examples[0],
          validation: {
            min: keys[9].schema.$_terms.keys[2].schema._rules[0].args.limit,
            max: keys[9].schema.$_terms.keys[2].schema._rules[1].args.limit,
            warningMessages: {
              length:
                keys[9].schema.$_terms.keys[2].schema._preferences.messages[
                  'string.min'
                ]._template[0] +
                keys[9].schema.$_terms.keys[2].schema._rules[0].args.limit +
                keys[9].schema.$_terms.keys[2].schema._preferences.messages[
                  'string.max'
                ]._template[0] +
                keys[9].schema.$_terms.keys[2].schema._rules[1].args.limit +
                keys[9].schema.$_terms.keys[2].schema._preferences.messages[
                  'string.max'
                ]._template[
                  keys[9].schema.$_terms.keys[2].schema._preferences.messages[
                    'string.max'
                  ]._template.length - 1
                ],
            },
          },
        },
    typeReq === 'add'
      ? {
          key: keys[10].key, // categories
          title: keys[10].schema.$_terms.items[0]._flags.description,
          type: keys[10].schema.$_terms.items[0].$_terms.notes[0],
          placeholder: keys[10].schema.$_terms.items[0].$_terms.examples[0],
          validation: {
            length: keys[10].schema.$_terms.items[0]._rules[0].args.limit,
            required: keys[10].schema.$_terms.items[0]._flags.presence,
            warningMessages: {
              length:
                keys[10].schema.$_terms.items[0]._preferences.messages[
                  'string.length'
                ]._template[0] +
                keys[10].schema.$_terms.items[0]._rules[0].args.limit +
                keys[10].schema.$_terms.items[0]._preferences.messages[
                  'string.length'
                ]._template[
                  keys[10].schema.$_terms.items[0]._preferences.messages[
                    'string.length'
                  ]._template.length - 1
                ],
              required:
                keys[10].schema.$_terms.items[0]._preferences.messages[
                  'any.required'
                ].rendered,
            },
          },
        }
      : {
          key: keys[10].key, // categories
          title: keys[10].schema.$_terms.items[0]._flags.description,
          type: keys[10].schema.$_terms.items[0].$_terms.notes[0],
          placeholder: keys[10].schema.$_terms.items[0].$_terms.examples[0],
          validation: {
            length: keys[10].schema.$_terms.items[0]._rules[0].args.limit,
            warningMessages: {
              length:
                keys[10].schema.$_terms.items[0]._preferences.messages[
                  'string.length'
                ]._template[0] +
                keys[10].schema.$_terms.items[0]._rules[0].args.limit +
                keys[10].schema.$_terms.items[0]._preferences.messages[
                  'string.length'
                ]._template[
                  keys[10].schema.$_terms.items[0]._preferences.messages[
                    'string.length'
                  ]._template.length - 1
                ],
            },
          },
        },
    {
      key: keys[11].key, // subcategories
      title: keys[11].schema.$_terms.items[0]._flags.description,
      type: keys[11].schema.$_terms.items[0].$_terms.notes[0],
      placeholder: keys[11].schema.$_terms.items[0].$_terms.examples[0],
      validation: {
        length: keys[11].schema.$_terms.items[0]._rules[0].args.limit,
        warningMessages: {
          length:
            keys[11].schema.$_terms.items[0]._preferences.messages[
              'string.length'
            ]._template[0] +
            keys[11].schema.$_terms.items[0]._rules[0].args.limit +
            keys[11].schema.$_terms.items[0]._preferences.messages[
              'string.length'
            ]._template[
              keys[11].schema.$_terms.items[0]._preferences.messages[
                'string.length'
              ]._template.length - 1
            ],
        },
      },
    },
  ];

  return options;
};
