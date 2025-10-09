const express = require('express');
const route = express.Router();


const Signup= require("../controller/user/signup")
//const signupvalidate= require("../middlewares/userSignup")
route.post("/signup",Signup )



module.exports = route