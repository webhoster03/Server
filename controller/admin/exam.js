require("dotenv").config()
const jwt = require("jsonwebtoken")
const admin_key = process.env.ADMIN_KEY
const { exam, paper } = require("./../../model/exam")
const shortid = require("short-unique-id")
const gen_short_id = new shortid({ length: 6 })
const format = require("date-format")

const Exam = (req, res) => {
    const auth = req.cookies ? req.cookies.adminAuth : null
    jwt.verify(auth, admin_key, async (err, token) => {
        if (err) {
            req.flash("messaage", "inauthentic login not allowed")
            return res.redirect("/admin")
        }
        if (token) {
            const getdata = await exam.find().select("-_id ").sort({ name: 1 });
            res.render("admin/exam",
                {
                    appName: process.env.APP_NAME,
                    name: req.cookies.name,
                    user: req.cookies.user,
                    adminid: req.cookies.adminid,
                    role: req.cookies.role,
                    data: getdata
                }
            )
        }
    })
}



const AddExam = (req, res) => {
    const getDate = req.body
    const auth = req.cookies ? req.cookies.adminAuth : null
    const rndid = gen_short_id.rnd()

    jwt.verify(auth, admin_key, async (err, token) => {
        if (err) {
            req.flash("messaage", "inauthentic login not allowed")
            return res.redirect("/admin")
        }
        if (token) {
            try {
                const ip = req.ip.startsWith("::ffff:") ? req.ip.replace("::ffff:", "") : req.ip;
                const data = {
                    exam: getDate.examname,
                    examuniqueid: rndid,
                    type: getDate.examtype,
                    area: getDate.examarea,
                    remarks: getDate.remarks,
                    createby: getDate.name,
                    creatorid: getDate.adminid,
                    active: 1,
                    visible: 1,
                    display: 0,
                    date: format("yyyy mm dd", new Date()),
                    time: format("hh mm", new Date()),
                    ip: ip
                }
                const checkExam = await exam.findOne({ exam: getDate.examname, })
                if (checkExam === null) {
                    const saveExam = await exam(data).save()
                    if (saveExam) {
                        res.status(200).send(JSON.stringify({
                            status: true,
                            message: `Add Exam Successfully , Exam name ${getDate.examname} and ExamId is ${rndid} `,
                            data: saveExam
                        }))
                    }
                    else {
                        res.status(200).send(JSON.stringify(
                            {
                                status: false,
                                message: `This exam name already exists. Exam not added. Exam name: ${getDate.examname}, ExamId: ${rndid}`
                            }))
                    }
                }
                else {
                    res.status(200).send(JSON.stringify(
                        {
                            status: false,
                            message: `This exam name already exists. Exam not added. Exam name: ${getDate.examname}, ExamId: ${rndid}`
                        }))
                }
            } catch (err) {
                res.status(200).send(JSON.stringify(
                    {
                        status: false,
                        message: `Sorry Unknown Error, Exam not add , Exam name ${getDate.examname} and ExamId is ${rndid} `
                    }))
            }
        } else {
            res.status(200).send(JSON.stringify(
                {
                    status: false,
                    message: `this exam name is already exists , 
                            duplicate exam name is not allowed , 
                            Exam name is ${checkExam.exam} ,
                            Exam uniquie id ${checkExam.examuniqueid}
                            and exam serial Number is ${checkExam.serialno}
                            `
                }))
        }
    })
}


//set paper

const AddPaper = (req, res) => {
    const auth = req.cookies ? req.cookies.adminAuth : null
    const data = req.body
    const rndid = gen_short_id.rnd()
    if (auth !== null) {
        jwt.verify(auth, admin_key, async (err, token) => {

            if (err) {
                req.flash("messaage", "inauthentic login not allowed")
                return res.redirect("/admin")
            }
            if (token) {
                try {
                    const ip = req.ip.startsWith("::ffff:") ? req.ip.replace("::ffff:", "") : req.ip;

                    const info = {
                        exam: data.examName,
                        examUniqueid: data.examuniqueid,
                        paper: data.Paper,
                        paperUniqueid: rndid,
                        totalQuestions: data.totalQuestions,
                        totalMarks: data.totalMarks,
                        itemMarks: data.itemMarks,
                        negativeMarks: data.negativeMarks,
                        duration: data.duration,
                        Type: {
                            previous: data.previous,
                            series: data.series,
                            subject: data.subject
                        },
                        Qualification: data.Qualification,
                        subjects: data.subjects,
                        Language: data.Language,
                        Remarks: data.Remarks,
                        createby: data.name,
                        creatorid: data.adminid,
                        active: 1,
                        visible: 1,
                        display: 0,
                        date: format("yyyy mm dd", new Date()),
                        time: format("hh mm", new Date()),
                        ip: ip
                    };

                    const checkpaper = await paper.find({ exam: data.examName, examUniqueid: data.examuniqueid, paper: data.Paper, })

                    if (Object.keys(checkpaper).length > 0) {
                        res.status(200).send(JSON.stringify({
                            status: false, message: `
                            same exam and paper adding not allow Exam "${checkpaper.exam}", Exam Code "${checkpaper.examUniqueid}" 
                            and paper Name is "${checkpaper.paper}".
                            `}))
                        return false;
                    }
                    try{
                        const savedata = await paper(info).save()
                    if (savedata) {
                        res.status(200).send(JSON.stringify({
                            status: true, message: `Your new exam papaer 
                            is name papen name and paper id is ${savedata.paper} , ${savedata.paperUniqueid} `
                        }))
                    } else {
                        res.status(200).send(JSON.stringify({
                            status: false, message: `Unknow error is , Your paper is not save, 
                            name papen name and paper id is ${savedata.paper} , ${savedata.paperUniqueid} `
                        }))
                    }
                    }catch(err){
                        console.log(err)
                        res.status(200).send(JSON.stringify({ status: false, message: "Unknow error is find" }))
                    }
                } catch (err) {
                    console.error("Error while adding paper:", err);
                    res.status(200).send(JSON.stringify({ status: false, message: "Unknow error is find" }))
                }
            }
        })
    } else {
        req.flash("messaage", "inauthentic login not allowed")
        return res.redirect("/admin")
    }
}


module.exports = { Exam, AddExam, AddPaper }