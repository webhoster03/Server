require("dotenv").config();
const employ = require("./../../model/employ")
const bcrypt = require("bcryptjs")
const solt = bcrypt.genSaltSync(14);
const jwt = require("jsonwebtoken");
const employ_key = process.env.EMPLOY_KEY




const Index = async(req, res) => {
    res.status(200).render('Employees/employees-login', {
        appName: process.env.APP_NAME,
        message: req.flash("message")
    });
}

const Login = async(req, res) => {
    const { user, password } = req.body;

    if (!user || !password) {
        req.flash("message", "All fields are required")
        return res.redirect("/")
    }
    const checkUser = await employ.findOne({ userid: user })

    if (checkUser && bcrypt.compareSync(password, checkUser.password)) {
        const data = {
            name: checkUser.name,
            user: checkUser.userid,
            useruniqueid: checkUser.useruniqueid,
            designation: checkUser.designation,
        }
        
        jwt.sign({ data }, employ_key, (err, token) => {
            if (err) {
                req.flash("message", "login authentication error")
                console.log(err)
                return res.redirect("/")
            }

            res.cookie('name', data.name, { maxAge: 24 * 60 * 60 * 30 * 1000, httpOnly: true })
            res.cookie('user', data.user, { maxAge: 24 * 60 * 60 * 30 * 1000, httpOnly: true })
            res.cookie('useruniqueid', data.useruniqueid, { maxAge: 24 * 60 * 60 * 30 * 1000, httpOnly: true })
            res.cookie('designation', data.designation, { maxAge: 24 * 60 * 60 * 30 * 1000, httpOnly: true })
            res.cookie("employAuth", token, { maxAge: 24 * 60 * 60 * 30 * 1000, httpOnly: true })
            res.redirect("/dashboard")
        })

    }
    else {
        req.flash("message", "Invalid credentials")
        return res.redirect("/")
    }
}




module.exports = { Index, Login }