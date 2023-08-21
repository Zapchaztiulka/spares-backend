const { nanoid } = require('nanoid');

module.exports = originalFileName => {
  const timestamp = Date.now();
  const uniqueId = nanoid();
  const fileNameParts = originalFileName.split('.');
  const fileExtension = fileNameParts[fileNameParts.length - 1];

  return `${uniqueId}_${timestamp}.${fileExtension}`;
};
