require("dotenv").config()
const jwt = require("jsonwebtoken")
const key = process.env.USER_KEY
const userSignup = require("../model/userSignup")


const CheckSignup = (req, res, next) => {
    const data = req.body
    const jwttoken = jwt.decode(data.signtoken, key)

    jwt.verify(data.signtoken, key, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: false, message: "User Authentication Error x01" })
        }
        if (jwttoken.response.name !== data.name) {
            return res.status(401).json({ status: false, message: "User Authentication Error x02" })
        }
        if (jwttoken.response.email !== data.mail) {
            return res.status(401).json({ status: false, message: "User Authentication Error x03" })
        }
        if (jwttoken.response.user_id !== data.user_id) {
            return res.status(401).json({ status: false, message: "User Authentication Error x04" })
        }
        if (Number(jwttoken.response.status) !== Number(data.status)) {
            return res.status(401).json({ status: false, message: "User Authentication Error x07" })
        }

        const checkuser = await userSignup.findOne({
            user_id: data.user_id,
            token: data.token,
            key: data.key,
            name: data.name,
            email: data.mail,
            status: data.status
        })
        if (checkuser === null) {
            return res.status(401).json({ status: false, message: "User Authentication Error x08" })
        } else {
            next()
        }
    })

}


module.exports = CheckSignup