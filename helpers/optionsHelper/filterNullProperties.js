// Omitting properties with null values
function filterNullProperties(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null),
  );
}

module.exports = { filterNullProperties };
