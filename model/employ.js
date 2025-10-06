require("./config")
const mongoose= require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);



const addEmploy= mongoose.Schema({
    name:{
        type: String
    },
    mail:{
        type: String
    },
    contact:{
        type: String
    },
    dob:{
        type: String
    },
    joinning:{
        type: String
    },
    userid:{
        type: String
    },
    useruniqueid:{
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    designation:{
        type: String
    },
    remarks:{
        type: String
    },
    createby: {
        type: String,
        required: true
    },
    creatorid: {
        type: String,
        required: true
    },
    active: {
        type: Number,
    },
    
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    ip: {
        type: String,
        //required: true
    },
})


addEmploy.plugin(AutoIncrement, { inc_field: 'employid' });
const employ = mongoose.model("employ", addEmploy)

module.exports= employ
