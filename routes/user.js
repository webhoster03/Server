const express = require('express');
const route = express.Router();


const Signup= require("../controller/user/signup")
const signupvalidate= require("../middlewares/userSignup")
route.post("/signup",signupvalidate, Signup )

const Verification= require("./../controller/user/verification")
route.get("/verification", Verification)



module.exports = route