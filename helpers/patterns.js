const availability = ['є в наявності', 'під замовлення', 'відсутній'];
const units = ['кг', 'шт', 'л'];
const roles = ['public', 'user', 'admin'];
const orderStatus = [
  'в обробці',
  'підтверджено',
  'замовлення виконано',
  'замовлення скасовано',
  'замовлення повернуто',
];

const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordPattern = /^.*(?=.{6,})((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/; // 6 characters, at least one upperCase and one lowercase

const patterns = {
  availability,
  roles,
  units,
  emailPattern,
  passwordPattern,
  orderStatus,
};

module.exports = patterns;
