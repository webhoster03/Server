const mongoose = require("mongoose");

const userSignupSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    key: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    }

})

const userSignup = mongoose.model("userSignup", userSignupSchema)

module.exports = userSignup