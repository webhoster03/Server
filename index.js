require("dotenv").config();
const express = require('express');
const app= express();
const cookieParser = require("cookie-parser")

const session = require("express-session")
const flash = require("connect-flash")



app.use(cookieParser())

app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:60000}
}))
app.use(flash())

app.use(express.static("css"))
app.use(express.static("appImage"))
app.use(express.static("js"))
app.use(express.static("editor"))
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")


app.use("/", require("./routes/employees"))
app.use('/admin',require("./routes/admin"))
app.use('/serverapi',require("./routes/serverapi"))
app.use('/question',require("./routes/question"))















app.listen(process.env.PORT || 2050)