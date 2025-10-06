const express =require("express")
const route = express.Router()


const {Index, Login}= require("./../controller/employees/employees-login")
route.get("/",Index)
route.get("/login",Index)
route.post("/login", Login)

const {Dashboard}= require("./../controller/employees/dashboard")
route.get("/dashboard",Dashboard)


const {Question} = require("./../controller/employees/question")
route.get("/question" , Question)






module.exports= route