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

const min = {
  user: 3,
  productName: 3,
  vendorCode: 2,
  price: 0.01,
  weight: 0.001,
  quantity: 1,
  alt: 2,
  description: 10,
  manufacturer: 3,
  category: 3,
  adminTag: 2,
};

const max = {
  user: 32,
  productName: 300,
  vendorCode: 50,
  price: 1000000000,
  weight: 1000000,
  quantity: 100,
  alt: 50,
  description: 2000,
  manufacturer: 100,
  category: 50,
  adminTag: 30,
};

const namePattern = /^[A-Za-zА-Яа-яёЁЇїІіЄєҐґ0-9]+$/;
const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordPattern = /^.*(?=.{6,})((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
const passwordPatternMessage =
  'має містити щонайменше 6 символів, принаймні один з них у верхньому і один у нижньому регістрі';
const phonePattern = /^0\d{9}$/;
const phonePatternMessage = `має починатися з ${0} і містити 10 цифр`;

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
  min,
  max,
  namePattern,
  emailPattern,
  passwordPattern,
  passwordPatternMessage,
  phonePattern,
  phonePatternMessage,
  orderStatus,
  companyData,
};

module.exports = patterns;
