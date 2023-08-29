const express = require('express');
const parse = require('joi-to-json');

const {
  product: { validationAddProducts, validationUpdateProduct },
  category: { validationCategory, validationUpdateCategory },
  user: {
    validationAuthUser,
    validationUpdateUser,
    validationEmailUser,
    validationPasswordUser,
  },
} = require('../../models');
const { optionsFromObject } = require('../../helpers/optionsHelper');
const router = express.Router();

router.get('/user', async (_, res) => {
  const optionsUserAuthentication = optionsFromObject(validationAuthUser);
  const userAuthentication = {
    title: 'Реєстрація/логінізація користувача',
    options: optionsUserAuthentication,
  };

  const optionsUpdateUser = optionsFromObject(validationUpdateUser);
  const updateUserInfo = {
    title: 'Оновлення даних користувача',
    options: optionsUpdateUser,
  };

  const optionsEmailValidation = optionsFromObject(validationEmailUser);
  const emailValidation = {
    title: 'Валідація e-mail користувача',
    options: optionsEmailValidation,
  };

  const optionsPasswordValidation = optionsFromObject(validationPasswordUser);
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
  const addProductsOptions = parse(validationAddProducts);
  addProductsOptions.router = 'add products';

  const updateProductOptions = parse(validationUpdateProduct);
  updateProductOptions.router = 'update product by id';

  return res.json({ addProductsOptions, updateProductOptions });
});

router.get('/category', async (_, res) => {
  const addCategoryOptions = parse(validationCategory);
  addCategoryOptions.router = 'add category';

  const updateCategoryOptions = parse(validationUpdateCategory);
  updateCategoryOptions.router = 'update category by id';

  return res.json({ addCategoryOptions, updateCategoryOptions });
});

module.exports = router;
