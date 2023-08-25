const express = require('express');
const parse = require('joi-to-json');

const { authenticate, hasRole } = require('../../middlewares');
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
const router = express.Router();

router.get('/product', authenticate, hasRole('admin'), async (_, res) => {
  const addProductsOptions = parse(validationAddProducts);
  addProductsOptions.router = 'add products';

  const updateProductOptions = parse(validationUpdateProduct);
  updateProductOptions.router = 'update product by id';

  return res.json({ addProductsOptions, updateProductOptions });
});

router.get('/category', authenticate, hasRole('admin'), async (_, res) => {
  const addCategoryOptions = parse(validationCategory);
  addCategoryOptions.router = 'add category';

  const updateCategoryOptions = parse(validationUpdateCategory);
  updateCategoryOptions.router = 'update category by id';

  return res.json({ addCategoryOptions, updateCategoryOptions });
});

router.get('/user', authenticate, hasRole('admin'), async (_, res) => {
  const userAuthentication = parse(validationAuthUser);
  userAuthentication.router = "user's authentication";

  const updateUserInfo = parse(validationUpdateUser);
  updateUserInfo.router = "update user's info";

  const emailValidation = parse(validationEmailUser);
  emailValidation.router = 'email validation';

  const passwordValidation = parse(validationPasswordUser);
  passwordValidation.router = 'password validation';

  return res.json({
    userAuthentication,
    updateUserInfo,
    emailValidation,
    passwordValidation,
  });
});

module.exports = router;
