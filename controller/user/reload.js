require("dotenv").config()
const userSignup = require("../../model/userSignup")
const jwt = require("jsonwebtoken")
const Key = process.env.USER_KEY


const Reload = async (req, res) => {
    const data = req.body
    const email = data.mail.toLowerCase()
    const checkuser = await userSignup.findOne({ email: email, user_id: data.user_id })
    if (Number(checkuser.status) !== 1) {
        return res.send({
            status: false,
            message: "Your account status is pending, please authentication your account, then reload this page"
        })
    }
    if (Number(checkuser.status) === 1) {
        const data = {
            user_id: checkuser.user_id,
            email: checkuser.email,
            name: checkuser.name,
            status: checkuser.status
        }
        jwt.sign(data, Key, (err, token) => {
            if (err) {
                return res.send({
                    status: false,
                    message: "login authentication error , Please login manually"
                })
            }
            return res.send({
                status: true,
                message: "Your account is active",
                token: token,
                user_id: checkuser.user_id,
                email: checkuser.email,
                name: checkuser.name,
                code: checkuser.status
            })
        })
    }else{
        return res.send({
            status: false,
            message: "Error in your account"
        })
    }


}

module.exports = Reload