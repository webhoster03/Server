const express = require('express');
const route = express.Router();


const Signup= require("../controller/user/signup")
const signupvalidate= require("../middlewares/userSignup")
route.post("/signup",signupvalidate, Signup )

const Verification= require("./../controller/user/verification")
route.get("/verification", Verification)

const Login= require("./../controller/user/login")
route.post("/login", Login)

const CheckSignup= require("./../middlewares/checkSignup")
const Reload= require("./../controller/user/reload")
route.post("/reload",CheckSignup, Reload)

const Resend = require("./../controller/user/resend")
route.post("/resend",CheckSignup, Resend)


module.exports = route