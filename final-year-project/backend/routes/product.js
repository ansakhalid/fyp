const express = require('express');
const router = express.Router();

const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
  listSearch,
  image,
  listRecommended,
} = require('../controllers/product');
const {
  requireSignin,
  isAuth,
  isAllowed,
  isAdmin,
} = require('../controllers/userprofiling');
const { userById } = require('../controllers/user');

router.get('/product/:productId', read);
router.post(
  '/product/create/:userId',
  requireSignin,
  isAuth,
  isAllowed,
  create
);
router.delete(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAllowed,
  remove
);
router.put(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAllowed,
  update
);

router.get('/products', list);
router.get('/products/search', listSearch);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);
router.get('/product/photo/:productId', photo);
router.get('/product/image/:productId', image);
router.get('/products/recommended', listRecommended);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
