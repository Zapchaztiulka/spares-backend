const availability = ['є в наявності', 'під замовлення', 'відсутній'];
const units = ['кг', 'шт', 'л'];
const roles = ['superAdmin', 'user', 'admin'];
const orderStatus = [
  'в обробці',
  'підтверджено',
  'замовлення виконано',
  'замовлення скасовано',
  'замовлення повернуто',
];

const namePattern = /^[A-Za-zА-Яа-яёЁЇїІіЄєҐґ0-9]+$/;
const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordPattern = /^.*(?=.{6,})((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/; // 6 characters, at least one upperCase and one lowercase
const phonePattern = /^0\d{9}$/;

const companyData = {
  firstPhone: '+38 067 111 22 33',
  secondPhone: '+38 095 111 22 33',
  thirdPhone: '+38 063 111 22 33',
  addressCompany: 'м. Кропивницький, вул. назва вулиці, номер будинку.',
};

const patterns = {
  availability,
  roles,
  units,
  namePattern,
  emailPattern,
  passwordPattern,
  phonePattern,
  orderStatus,
  companyData,
};

module.exports = patterns;
