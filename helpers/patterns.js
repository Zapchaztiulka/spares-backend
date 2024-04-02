// COMMON PATTERNS
const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const isNumeric = value => /^[0-9]+$/.test(value);
const namePattern = /^[A-Za-zА-Яа-яёЁЇїІіЄєҐґ0-9]+$/;
const min = {
  user: 3,
  productName: 3,
  vendorCode: 2,
  price: 0.01,
  deliveryRate: 0,
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
  companyName: 1,
  companyRegion: 5,
  companyCity: 2,
  companyAddress: 10,
};
const max = {
  user: 32,
  productName: 300,
  vendorCode: 50,
  price: 1000000000,
  deliveryRate: 1000000,
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
  companyName: 250,
  companyRegion: 50,
  companyCity: 50,
  companyAddress: 200,
};
const companyData = {
  firstPhone: '+38 067 111 22 33',
  secondPhone: '+38 095 111 22 33',
  thirdPhone: '+38 063 111 22 33',
  addressCompany: 'м. Кропивницький, вул. назва вулиці, номер будинку.',
};
const dataTypes = ['number', 'string', 'array'];

// USER PATTERNS
const roles = ['superAdmin', 'admin', 'user'];
const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordPattern = /^.*(?=.{6,})((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
const passwordPatternMessage =
  'має містити щонайменше 6 цифр або букв латинського алфавіту, принаймні одну велику і одну маленьку літеру';
const phonePattern = /^0\d{9}$/;
const phonePatternMessage = `має починатися з ${0} і містити 10 цифр`;

// PRODUCT PATTERNS

const availability = ['в наявності', 'під замовлення', 'відсутній'];
const units = ['кг', 'шт', 'л'];
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
const sortTypes = ['smallLarge', 'largeSmall'];
const sortBy = ['name', 'price', 'purchased'];

// ORDER PATTERNS
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
const deliveryMethods = [
  {
    deliveryMethodId: 'self',
    deliveryMethodName: 'Самовивіз',
    isAvailable: true,
    isByCourier: false,
  },
  {
    deliveryMethodId: 'courier',
    deliveryMethodName: "Кур'єр Запчастюлька",
    isAvailable: true,
    isByCourier: true,
  },
  {
    deliveryMethodId: 'np',
    deliveryMethodName: 'Нова пошта',
    isAvailable: true,
    isByCourier: false,
  },
  {
    deliveryMethodId: 'np_courier',
    deliveryMethodName: "Кур'єр Нова Пошта",
    isAvailable: true,
    isByCourier: true,
  },
  {
    deliveryMethodId: 'up',
    deliveryMethodName: 'Укрпошта',
    isAvailable: true,
    isByCourier: false,
  },
  {
    deliveryMethodId: 'up_courier',
    deliveryMethodName: "Кур'єр Укрпошта",
    isAvailable: false,
    isByCourier: true,
  },
  {
    deliveryMethodId: 'meest',
    deliveryMethodName: 'Meest express',
    isAvailable: true,
    isByCourier: false,
  },
  {
    deliveryMethodId: 'meest_courier',
    deliveryMethodName: "Кур'єр Meest express",
    isAvailable: false,
    isByCourier: true,
  },
];
const userTypes = ['individual', 'entrepreneur', 'company'];

// USER REQUEST PATTERNS
const typeUserApplication = [
  'call',
  'special',
  'review',
  'preorder',
  'another',
];
const statusUserApplication = ['new', 'in progress', 'completed'];
const sortUserApplicationBy = ['type', 'status', 'createdAt'];

// CHAT PATTERNS
const chatRoomStatus = ['in progress', 'completed'];
const chatRating = [1, 2, 3, 4, 5];
const messageType = ['text', 'image'];

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
  deliveryMethods,
  userTypes,
  chatRoomStatus,
  chatRating,
  messageType,
  companyData,
  dataTypes,
};

module.exports = patterns;
