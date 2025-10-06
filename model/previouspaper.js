require("./config");
const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const previousPaperDataSchema = mongoose.Schema({
    examname: {
        type: String,
        required: true
    },
    examid: {
        type: String,
        required: true
    },
    papernamem: {
        type: String,
        required: true
    },
    paperid: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    testcode: {
        type: String,
        required: true
    },
    testid: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    remarks: {
        type: String
    },

})
const previousPaperData = mongoose.model("previousPaperData", previousPaperDataSchema)


const previousQuestionOneSchema = mongoose.Schema({
    testcode: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true,
        unique: true,
    },
    languageOne: {
        type: String,
        required: true
    },
    questionOne: {
        type: String,
        required: true
    },
    questionOneOptionOne: {
        type: String,
        required: true
    },
    questionOneOptiontwo: {
        type: String,
        required: true
    },
    questionOneOptionthree: {
        type: String,
        required: true
    },
    questionOneOptionfour: {
        type: String,
        required: true
    }
})

const previousQuestionOne = mongoose.model("previousQuestionOne", previousQuestionOneSchema)

const previousQuestiontwoSchema = mongoose.Schema({
    questionId: {
        type: String,
        required: true,
        unique: true,
    },
    questionTwo: {
        type: String,
        required: true
    },
    languageTwo: {
        type: String,
        required: true
    },
    questionTwoOptionOne: {
        type: String,
        required: true
    },
    questionTwoOptiontwo: {
        type: String,
        required: true
    },
    questionTwoOptionthree: {
        type: String,
        required: true
    },
    questionTwoOptionfour: {
        type: String,
        required: true
    }
})

const previousQuestiontwo = mongoose.model("previousQuestiontwo", previousQuestiontwoSchema)


const answerSchema = mongoose.Schema({
    testcode: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true,
        unique: true,
    },

    QNo: {
        type: String,
        required: true
    },
    
    answer: {
        type: String,
        required: true
    },
    groupId:{
        type: String,
        required: true
    },
    questionCount:{
        type: String,
        required: true
    },
    questionCountNo:{
        type: String,
        required: true
    },

})


const answer= mongoose.model("previousanswer", answerSchema)



module.exports = {
    previousPaperData,
    previousQuestionOne,
    previousQuestiontwo,
    answer

}