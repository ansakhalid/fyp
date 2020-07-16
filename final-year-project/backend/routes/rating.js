const express = require('express');
const router = express.Router();
const { requireSignin } = require('../controllers/userprofiling');
const { userById } = require('../controllers/user');
const { productById } = require('../controllers/product');
const { create, rem } = require('../controllers/rating');

router.post('/rating/create/:userId/:productId', requireSignin, create);
router.get('/rating/rem', rem);
router.param('userId', userById);
router.param('productId', productById);
module.exports = router;
