const { exam, paper } = require("./../../model/exam")
const shortid= require("short-unique-id")
const uniqueid= new shortid({length:10})

/* this code is find all exam and send to add exam box ejs file  */
const Exam = async (req, res) => {
    const getexam = await exam.find({ active: 1 }).sort().select(`
        exam
        examuniqueid
        -_id
        `)
    
    res.status(200).send(JSON.stringify(getexam))
}

const Paper= async(req, res)=>{
    const data = req.body
    const paperid= uniqueid.rnd()
    const id= {uniqueid: paperid}
    const getpaper= await paper.find({examUniqueid:data.examUniqueid, active: 1}).select(`
        exam
        examUniqueid
        paper
        paperUniqueid
        Language
        Type
        -_id
        `)

    res.status(200).send(JSON.stringify({paper: getpaper, id:id}))
}


module.exports = {
    Exam,
    Paper
}