const express = require("express");
const router = express.Router();

const {
    signup,
    signin,
    signout,
    requireSignin
} = require("../controllers/userprofiling");
const { userSignupValidator } = require("../fieldchecker/validation");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

router.get("/hello",requireSignin,(req,res)=>{
    res.send('hellooo')
})

module.exports = router;