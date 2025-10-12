require("dotenv").config();
const adminLogin = require("./../../model/admin-login")
const bcrypt = require("bcryptjs")
//const solt = bcrypt.genSaltSync(14);
const jwt = require("jsonwebtoken")
const adminKey = process.env.ADMIN_KEY






const Index = async (req, res) => {

    const auth = req.cookies ? req.cookies : null


    if (auth.adminAuth === null || auth.adminAuth === undefined || auth.adminAuth === "undefined" || auth.adminAuth === "null") {
        return res.render("admin/admin-login", {
            appName: process.env.APP_NAME,
            message: req.flash("message")
        })
    }
    jwt.verify(auth.adminAuth, adminKey, async (err, token) => {
        if (err) {
            return res.render("admin/admin-login", {
                appName: process.env.APP_NAME,
                message: req.flash("message")
            })
        }

        if (token) {
            const decode = jwt.decode(auth.adminAuth, adminKey)
            if (decode.data.name !== auth.name || decode.data.user !== auth.user || decode.data.adminid !== auth.adminid || decode.data.role !== auth.role) {
                return res.render("admin/admin-login", {
                    appName: process.env.APP_NAME,
                    message: req.flash("message")
                })
            }
            else{
                return res.redirect("/admin/dashboard")
            }
        }
    })


}

const Login = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) {
        req.flash("message", "All fields are required")
        return res.redirect("/admin")
    }
    const checkUser = await adminLogin.findOne({ user })
    if (checkUser && bcrypt.compareSync(password, checkUser.password)) {
        const data = {
            name: checkUser.name,
            user: checkUser.user,
            adminid: checkUser.adminid,
            role: checkUser.role,
        }
        jwt.sign({ data }, adminKey, (err, token) => {
            if (err) {
                req.flash("message", "login authentication error")
                console.log(err)
                return res.redirect("/admin")
            }

            res.cookie('name', data.name, { maxAge: 24 * 60 * 60 * 30 * 1000, httpOnly: true })
            res.cookie('user', data.user, { maxAge: 24 * 60 * 60 * 30 * 1000, httpOnly: true })
            res.cookie('adminid', data.adminid, { maxAge: 24 * 60 * 60 * 30 * 1000, httpOnly: true })
            res.cookie('role', data.role, { maxAge: 24 * 60 * 60 * 30 * 1000, httpOnly: true })
            res.cookie("adminAuth", token, { maxAge: 24 * 60 * 60 * 30 * 1000, httpOnly: true })
            res.redirect("/admin/dashboard")
        })

    }
    else {
        req.flash("message", "Invalid credentials")
        return res.redirect("/admin")
    }


}





module.exports = { Index, Login }