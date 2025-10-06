const express = require('express');
const route = express.Router();


const Question = require("./../controller/question/question")
route.post("/", Question)


const QuestionNo = require("./../controller/question/get-question-no")
route.post("/getquestionno", QuestionNo)



const {deleteGroup, endGroup}= require("./../controller/question/resetgroup")
route.post("/groupdelete", deleteGroup)
route.post("/groupend", endGroup)











module.exports = route