require("./config");
const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


const examSchema = new mongoose.Schema({
    exam: {
        type: String,
        required: true
    },
    examuniqueid: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    remarks: {
        type: String
    },
    createby: {
        type: String,
        required: true
    },
    creatorid: {
        type: String,
        required: true
    },
    active: {
        type: Number,
        required: true
    },
    visible: {
        type: Number,
        required: true
    },
    display: {
        type: Number,
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
    ip: {
        type: String,
        required: true
    },
});



const PaperSchema = new mongoose.Schema({
    exam: {
        type: String,
        required: true
    },
    examUniqueid: {
        type: String,
        required: true
    },
    paper: {
        type: String,
        required: true
    },
    paperUniqueid: {
        type: String,
        required: true,
        unique: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    itemMarks: {
        type: Number,
        required: true
    },
    negativeMarks: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },

    Type: {
        previous: {
            type: String,
            required: true
        },
        series: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
    },
    
    Qualification: {
        type: String,
        required: true
    },
    subjects: {
        type: String,
        required: true
    },
    Language: {
        type: String,
        required: true
    },
    Remarks: {
        type: String,
    },

    createby: {
        type: String,
        required: true
    },
    creatorid: {
        type: String,
        required: true
    },
    active: {
        type: Number,
        required: true
    },
    visible: {
        type: Number,
        required: true
    },
    display: {
        type: Number,
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
    ip: {
        type: String,
        required: true
    },
});



examSchema.plugin(AutoIncrement, { inc_field: 'examno' });
const exam = mongoose.model("Exam", examSchema);

PaperSchema.plugin(AutoIncrement, { inc_field: 'paperno' });
const paper =mongoose.model("Paper", PaperSchema);

module.exports = {
    exam,
    paper
}
