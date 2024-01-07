function getPropsFromSchema(productSchema) {
  const allFields = {};

  Object.keys(productSchema.paths).forEach(field => {
    // Отримати інформацію про кожне поле
    const fieldInfo = productSchema.paths[field];

    // Зберегти інформацію про поле у об'єкт
    allFields[field] = {
      type: fieldInfo.instance,
      required: fieldInfo.isRequired,
      default: fieldInfo.options.default,
    };

    // Додатково можна обробити вкладені об'єкти та масиви
    if (fieldInfo.schema) {
      allFields[field].nestedFields = {};

      Object.keys(fieldInfo.schema.paths).forEach(nestedField => {
        const nestedFieldInfo = fieldInfo.schema.paths[nestedField];

        allFields[field].nestedFields[nestedField] = {
          type: nestedFieldInfo.instance,
          required: nestedFieldInfo.isRequired,
          default: nestedFieldInfo.options.default,
        };
      });
    }
  });

  const flattenedFields = flattenFields(allFields);

  return flattenedFields;
}

function flattenFields(obj, parentKey = '') {
  const result = [];

  for (const key in obj) {
    const field = obj[key];

    // Перевірка, чи це вкладений об'єкт або масив
    if (field.nestedFields) {
      // Рекурсивний виклик для вкладеного об'єкта
      const nestedKeys = flattenFields(field.nestedFields, key);
      result.push(...nestedKeys);
    } else {
      // Формування імені властивості з урахуванням батьківського ключа
      const propertyName = parentKey ? `${parentKey}.${key}` : key;
      result.push(propertyName);
    }
  }

  return result;
}

module.exports = { getPropsFromSchema };
