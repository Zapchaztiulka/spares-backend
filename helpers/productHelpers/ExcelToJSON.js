const photoConversion = (photoString, productName) => {
  let photoArray = [];
  if (photoString) {
    const stringWithoutSpaces = photoString
      .toString()
      .trim()
      .replace(/\s+/g, '');
    const urls = stringWithoutSpaces.split(',');
    photoArray = urls.map(url => {
      return {
        url: url.trim(),
        alt: productName || 'Spare photo',
      };
    });
  }
  return photoArray;
};

const manufacturerConversion = (country, factory, trademark) => {
  const manufacturer = {
    country: country?.toString().trim() || '',
    factory: factory?.toString().trim() || '',
    trademark: trademark?.toString().trim(),
  };

  return manufacturer;
};

const stringToArray = string => {
  let array = [];
  if (string) {
    const stringWithoutSpaces = string?.toString().trim().replace(/\s+/g, '');
    array = stringWithoutSpaces.split(',');
    return array;
  }
  return array;
};

module.exports = {
  photoConversion,
  manufacturerConversion,
  stringToArray,
};
