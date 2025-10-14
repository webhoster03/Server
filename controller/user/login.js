const userSignup = require("./../../model/userSignup")
const bcrypt = require("bcryptjs")
const solt = bcrypt.genSaltSync(14);
const jwt = require("jsonwebtoken")
const key = process.env.USER_KEY

const Login = async (req, res) => {
    const data = req.body
    const email = data.email.toLowerCase()
    const checkUser = await userSignup.findOne({ email: email, status: 1 })

    if (checkUser === null || checkUser === "null") {
        res.status(200).send(JSON.stringify({ status: false, message: "credentials not match" }))
        return false
    }

    if (checkUser && await bcrypt.compare(data.password, checkUser.password)) {
        const data = {
            user_id: checkUser.user_id,
            name: checkUser.name,
            email: checkUser.email,
            status: checkUser.status,
        }

        jwt.sign({ data }, key, async (err, token) => {
            if (err) {
                res.status(200).send(JSON.stringify({ status: false, message: "technical error in login page , try after some time " }))
                return false
            }

            res.status(200).send(JSON.stringify({status: true, data, token:token}))
            return false
        })

    } else {
        res.status(200).send(JSON.stringify({ status: false, message: "credentials not match" }))
        return false
    }
}

module.exports = Login