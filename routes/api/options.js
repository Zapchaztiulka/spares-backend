const express = require('express');
const parse = require('joi-to-json');

const {
  user: {
    validationAuthUser,
    validationUpdateUser,
    validationEmailUser,
    validationPasswordUser,
  },
  product: { validationAddProducts, validationUpdateProduct },
  category: { validationCategory, validationUpdateCategory },
} = require('../../models');
const {
  getPropertiesFromJoi,
  getProductProperties,
} = require('../../helpers/optionsHelper');
const router = express.Router();

router.get('/user', async (_, res) => {
  const optionsUserAuthentication = getPropertiesFromJoi(validationAuthUser);
  const userAuthentication = {
    title: 'Реєстрація/логінізація користувача',
    options: optionsUserAuthentication,
  };

  const optionsUpdateUser = getPropertiesFromJoi(validationUpdateUser);
  const updateUserInfo = {
    title: 'Оновлення даних користувача',
    options: optionsUpdateUser,
  };

  const optionsEmailValidation = getPropertiesFromJoi(validationEmailUser);
  const emailValidation = {
    title: 'Валідація e-mail користувача',
    options: optionsEmailValidation,
  };

  const optionsPasswordValidation = getPropertiesFromJoi(
    validationPasswordUser,
  );
  const passwordValidation = {
    title: 'Валідація паролю користувача',
    options: optionsPasswordValidation,
  };

  return res.json({
    userAuthentication,
    updateUserInfo,
    emailValidation,
    passwordValidation,
  });
});

router.get('/product', async (_, res) => {
  const addProductsOptions = getProductProperties(
    validationAddProducts.$_terms.items[0],
  );
  const addProducts = {
    title: 'Додавання нових товарів',
    options: addProductsOptions,
  };

  // const updateProductOptions = getProductProperties(validationUpdateProduct);
  // const updateProduct = {
  //   title: 'Оновлення товару',
  //   options: updateProductOptions,
  // };

  return res.json({
    addProducts,
    // updateProduct,
  });
});

router.get('/category', async (_, res) => {
  const addCategoryOptions = parse(validationCategory);
  addCategoryOptions.router = 'add category';

  const updateCategoryOptions = parse(validationUpdateCategory);
  updateCategoryOptions.router = 'update category by id';

  return res.json({ addCategoryOptions, updateCategoryOptions });
});

module.exports = router;
