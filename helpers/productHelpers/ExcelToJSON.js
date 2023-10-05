const photoConversion = (photoString, productName) => {
  let photoArray = [];
  if (photoString) {
    const stringWithoutSpaces = photoString.replace(/\s+/g, '');
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
    country: country || '',
    factory: factory || '',
    trademark,
  };

  return manufacturer;
};

const stringToArray = string => {
  let array = [];
  if (string) {
    const stringWithoutSpaces = string.replace(/\s+/g, '');
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
