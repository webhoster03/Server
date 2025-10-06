const express = require('express');
const route = express.Router();


const {Exam, Paper}= require("./../controller/serverapi/questioninfo")
route.get("/exam", Exam)
route.post("/paper", Paper)

const GroupId = require("../controller/serverapi/groupid")

route.get("/groupid", GroupId)



module.exports = route