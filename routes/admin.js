const express = require('express');
const route = express.Router();




const {Index, Login}= require("./../controller/admin/admin-login")
const adminAuth= require("./../middlewares/check-admin-login")


route.get('/',Index)
route.get('/login',Index)
route.post('/login',Login)


const {Dashboard}= require("./../controller/admin/dashboard")
route.get('/dashboard',Dashboard)



const {Exam, AddExam, AddPaper} = require("./../controller/admin/exam")
route.get("/exam",adminAuth, Exam)
route.post("/addexam",adminAuth, AddExam)
route.post("/addpaper", adminAuth, AddPaper)


const {Employ, Addemploy}= require("./../controller/admin/employ")
route.get("/employ", adminAuth, Employ)
route.post("/addemploy", adminAuth, Addemploy)



module.exports = route