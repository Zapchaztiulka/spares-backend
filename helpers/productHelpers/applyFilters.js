const { ObjectId } = require('mongodb');

module.exports = (products, bodyQuery) => {
  return products.filter(product => {
    const {
      minPrice,
      maxPrice,
      minPriceUpdateDate,
      maxPriceUpdateDate,
      minWeight,
      maxWeight,
      minQuantity,
      maxQuantity,
      units,
      countries,
      factories,
      trademarks,
      categories,
      subcategories,
    } = bodyQuery;

    if (minPrice && product.price.value < minPrice) return false;
    if (maxPrice && product.price.value > maxPrice) return false;

    if (
      minPriceUpdateDate &&
      product.price.updatedAt.getTime() < minPriceUpdateDate
    ) {
      return false;
    }
    if (
      maxPriceUpdateDate &&
      product.price.updatedAt.getTime() > maxPriceUpdateDate
    ) {
      return false;
    }

    if (minWeight && product.weight < minWeight) return false;
    if (maxWeight && product.weight > maxWeight) return false;

    if (minQuantity !== undefined && product.quantity < minQuantity) {
      return false;
    }
    if (maxQuantity !== undefined && product.quantity > maxQuantity) {
      return false;
    }

    if (units?.length > 0 && !units.includes(product.units)) return false;

    if (
      countries?.length > 0 &&
      !countries.includes(product.manufacturer.country)
    ) {
      return false;
    }
    if (
      factories?.length > 0 &&
      !factories.includes(product.manufacturer.factory)
    ) {
      return false;
    }
    if (
      trademarks?.length > 0 &&
      !trademarks.includes(product.manufacturer.trademark)
    ) {
      return false;
    }

    if (
      categories?.length > 0 &&
      !categories.some(category =>
        product.categories.some(categoryId =>
          categoryId.equals(new ObjectId(category)),
        ),
      )
    ) {
      return false;
    }
    if (
      subcategories?.length > 0 &&
      !subcategories.some(subcategory =>
        product.subcategories.some(subcategoryId =>
          subcategoryId.equals(new ObjectId(subcategory)),
        ),
      )
    ) {
      return false;
    }

    return true;
  });
};
