const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const isNumeric = value => /^[0-9]+$/.test(value);

const availability = ['в наявності', 'під замовлення', 'відсутній'];

const units = ['кг', 'шт', 'л'];

const roles = ['superAdmin', 'admin', 'user'];

const orderStatus = [
  'нове',
  'підтверджено',
  'комплектується',
  'передано в службу доставки',
  'очікує клієнта в пункті видачі',
  "очікує вручення кур'єром",
  'очікується післяплата',
  'завершено',
  'рекламація',
  'повернуто',
  'забраковано',
  'скасовано',
];

const productSortRules = [
  'name',
  'manufacturer.trademark',
  'categories.categoryName',
  'subcategories.subcategoryName',
  'description',
  'manufacturer.country',
  'manufacturer.factory',
  'vendorCode',
];

const typeUserApplication = [
  'call',
  'special',
  'review',
  'preorder',
  'another',
];

const statusUserApplication = ['new', 'in progress', 'completed'];
const sortUserApplicationBy = ['type', 'status', 'createdAt'];

const sortTypes = ['smallLarge', 'largeSmall'];
const sortBy = ['name', 'price', 'purchased'];

const chatRoomStatus = ['in progress', 'completed'];
const chatRating = [1, 2, 3, 4, 5];
const messageType = ['text', 'image'];

const min = {
  user: 3,
  productName: 3,
  vendorCode: 2,
  price: 0.01,
  weight: 0.001,
  quantity: 0,
  alt: 2,
  description: 10,
  manufacturer: 3,
  category: 3,
  adminTag: 2,
  questionGroup: 2,
  question: 5,
  answer: 10,
  priceUpdateDate: 1672531200000,
};

const max = {
  user: 32,
  productName: 300,
  vendorCode: 50,
  price: 1000000000,
  weight: 1000000,
  quantity: 10000,
  alt: 500,
  description: 2000,
  manufacturer: 100,
  category: 50,
  adminTag: 30,
  questionGroup: 50,
  question: 250,
  answer: 2000,
  priceUpdateDate: Date.now(),
};

const namePattern = /^[A-Za-zА-Яа-яёЁЇїІіЄєҐґ0-9]+$/;
const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordPattern = /^.*(?=.{6,})((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
const passwordPatternMessage =
  'має містити щонайменше 6 цифр або букв латинського алфавіту, принаймні одну велику і одну маленьку літеру';
const phonePattern = /^0\d{9}$/;
const phonePatternMessage = `має починатися з ${0} і містити 10 цифр`;

const companyData = {
  firstPhone: '+38 067 111 22 33',
  secondPhone: '+38 095 111 22 33',
  thirdPhone: '+38 063 111 22 33',
  addressCompany: 'м. Кропивницький, вул. назва вулиці, номер будинку.',
};

const patterns = {
  alphabet,
  isNumeric,
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
  typeUserApplication,
  statusUserApplication,
  sortUserApplicationBy,
  productSortRules,
  sortTypes,
  sortBy,
  chatRoomStatus,
  chatRating,
  messageType,
  companyData,
};

module.exports = patterns;
