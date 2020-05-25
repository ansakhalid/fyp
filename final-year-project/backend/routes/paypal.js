const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/userprofiling");
const { userById } = require("../controllers/user");
const { generateToken, processPayment } = require("../controllers/paypal");

router.get("/braintree/getToken/:userId", requireSignin, isAuth, generateToken);
router.post( "/braintree/payment/:userId",requireSignin,isAuth,processPayment);

router.param("userId", userById);

module.exports = router;