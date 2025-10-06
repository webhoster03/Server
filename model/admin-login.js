const mongoose = require('mongoose');
require("./config")

const admin= new mongoose.Schema({
    name:{
        require:true,
        type: String
    },
    adminid:{
        require:true,
        type: String
    },
    user:{
        require:true,
        type: String
    },
    password:{
        require:true,
        type: String
    },
    role:{
        require:true,
        type: String
    }   

})

const adminLogin= mongoose.model("adminlogin", admin)

module.exports= adminLogin