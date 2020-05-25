const express = require('express');
const router = express.Router();

const { create, categoryById, read, update, remove, list } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin ,isAllowed} = require('../controllers/userprofiling');
const { userById } = require('../controllers/user');

router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignin, isAuth, isAllowed, create);
router.put('/category/:categoryUpdateId/:userId', requireSignin, isAuth, isAllowed, update);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAllowed, update);

router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAllowed, remove);
router.get('/categories', list);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;