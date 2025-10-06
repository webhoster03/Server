const format = require("date-format")
const shortid = require("short-unique-id")
const getid = new shortid({ length: 8 })


const {
    previousPaperData,
    previousQuestionOne,
    previousQuestiontwo,
    answer

} = require("./../../model/previouspaper")

const {
    seriesData,
    seriesQuestionOne,
    seriesQuestiontwo,
    seriesanswer
} = require("./../../model/series")

const { exam, paper } = require("./../../model/exam")








const Question = async (req, res) => {
    const data = req.body
    const cookie = req.cookies
    const date = format("yyyy mm dd", new Date())
    const time = format("hh mm", new Date())
    const ip = req.ip.startsWith("::ffff:") ? req.ip.replace("::ffff:", "") : req.ip;
    const questionUniqueId = getid.rnd()


    const language = data.language
    if (language === null || language === "null") {
        return false
    }

    const splitLanguage = language.split("\n").sort()

    //get question number for Previouse paper

    var QNo;
    if (data.type === "previous") {
        const getQusetionNo = await answer.find({ testcode: data.setcodeid })//update question number 
        if (getQusetionNo.length === 0) {
            QNo = Number(1)
        } else {
            QNo = Number(getQusetionNo.at(-1).QNo) + 1
        }
    }

    if (data.type === "series") {
        const questionId = await seriesanswer.find({ testcode: data.setcodeid })
        if (questionId.length === 0) {
            QNo = Number(1)
        } else {
            QNo = Number(questionId.at(-1).QNo) + 1
        }
    }

    //Question and there options ans answer
    const QuestionOne = {
        testcode: data.setcodeid,
        questionId: questionUniqueId,
        languageOne: splitLanguage[0],
        questionOne: data.questionOne,
        questionOneOptionOne: data.questionOneOptionOne,
        questionOneOptiontwo: data.questionOneOptiontwo,
        questionOneOptionthree: data.questionOneOptionthree,
        questionOneOptionfour: data.questionOneOptionfour
    }
    const questionTwo = {
        testcode: data.setcodeid,
        questionId: questionUniqueId,
        languageTwo: splitLanguage[1],
        questionTwo: data.questionTwo,
        questionTwoOptionOne: data.questionTwoOptionOne,
        questionTwoOptiontwo: data.questionTwoOptiontwo,
        questionTwoOptionthree: data.questionTwoOptionthree,
        questionTwoOptionfour: data.questionTwoOptionfour
    }
    const answer = {
        testcode: data.setcodeid,
        questionId: questionUniqueId,
        QNo: QNo || 0,
        answer: data.answer,
        groupId: data.groupId,
        questionCount: data.groupCount,
        questionCountNo: data.groupRemainCount,
    }


    //-------------------------------------------------------------------------
    const previous = async () => {

        const checkTestStatus = await previousPaperData.findOne({ testcode: data.setcodeid })
        if (checkTestStatus === null) {


            const TestCodeNo = await previousPaperData.find();
            let getTestCode;
            if (TestCodeNo.length > 0) {
                getTestCode = Number(TestCodeNo.at(-1).testid) + 1;
            } else {
                getTestCode = 1;
            }



            const testInfo = {
                examname: data.examname,
                examid: data.examid,
                papernamem: data.papernamem,
                paperid: data.paperid,
                year: data.year,
                testcode: data.setcodeid,
                testid: getTestCode,
                language: data.language,
                author: cookie.name,
                userId: cookie.user,
                authorId: cookie.useruniqueid,
                date: date,
                time: time,
                status: false,
                ip: ip,
                remarks: data.remarks,
            }
            await previousPaperData(testInfo).save()
        }




        const gettotalQuestion = await paper.findOne({ paperUniqueid: data.paperid }).select(`totalQuestions -_id`)
        const updatePaperInfo = async () => {
            if (Number(gettotalQuestion.totalQuestions) === QNo) {
                const paperUpdate = await paper.updateOne({ examUniqueid: data.examid, paperUniqueid: data.paperid }, {
                    $set: {
                        display: 1
                    }
                })

                if (paperUpdate.acknowledged === true) {
                    await exam.updateOne({ examuniqueid: data.examid },
                        {
                            $set: {
                                display: 1
                            }
                        }
                    )
                }
            }
        }



        if (splitLanguage.length === 1) {
            if (Number(gettotalQuestion.totalQuestions) >= QNo) {
                const oneSave = await previousQuestionOne(QuestionOne).save()
                const answerSave = await answer(answer).save()
                if (oneSave && answerSave) {
                    res.status(200).send(JSON.stringify({
                        status: true,
                        code: 1,
                        QNo: QNo,
                        message: `Question add `
                    }))
                    updatePaperInfo()
                }
                else {
                    res.status(200).send(JSON.stringify({
                        status: false,
                        code: 2,
                        message: `Unknow error in add to Question`
                    }))
                }
            } else {
                res.status(200).send(JSON.stringify({
                    status: false,
                    code: 3,
                    message: `Total number of questions limit is complete. If any question is remaining, check the test, delete unwritten question, and enter the correct one.`
                }))
            }


            return false
        }


        if (splitLanguage.length === 2) {

            if (Number(gettotalQuestion.totalQuestions) >= QNo) {
                const oneSave = await previousQuestionOne(QuestionOne).save()
                const twoSave = await previousQuestiontwo(questionTwo).save()
                const answerSave = await answer(answer).save()
                if (oneSave && twoSave && answerSave) {
                    res.status(200).send(JSON.stringify({
                        status: true,
                        code: 1,
                        QNo: QNo,
                        message: `Question add `
                    }))
                    updatePaperInfo()
                }
                else {
                    res.status(200).send(JSON.stringify({
                        status: false,
                        code: 2,
                        message: `Unknow error in add to Question`
                    }))
                }
            } else {
                res.status(200).send(JSON.stringify({
                    status: false,
                    code: 3,
                    message: `Total number of questions limit is complete. If any question is remaining, check the test, delete unwritten question, and enter the correct one.`
                }))
            }
            return false
        }
    }


    //--------------------------------------------------------------------------
    const series = async () => {
        const checkSeriseStatus = await seriesData.findOne({ testcode: data.setcodeid });
        console.log(checkSeriseStatus)


        let testid
        if (checkSeriseStatus === null) {
            const getTestId = await seriesData.find()
            if (Object.keys(getTestId).length === 0) {
                testid = Number(1)
            }
            else {
                testid = Number(getTestId.at(-1).testid) + 1
            }
            const seriesInfo = {
                examname: data.examname,
                examid: data.examid,
                papernamem: data.papernamem,
                paperid: data.paperid,
                seriescode: data.seriescode,
                seriesno: data.seriesno,
                testcode: data.setcodeid,
                testid: testid,
                language: data.language,
                author: cookie.name,
                userId: cookie.user,
                authorId: cookie.useruniqueid,
                date: date,
                time: time,
                status: false,
                ip: ip,
                remarks: data.remarks,
            }

            await seriesData(seriesInfo).save()
        }


        const checkpaperLenght = await paper.findOne({ paperUniqueid: data.paperid }).select(`totalQuestions -_id`)
        console.log(1)

        if (Number(checkpaperLenght.totalQuestions) >= QNo) {
            console.log(checkpaperLenght)

            if (splitLanguage.length === 1) {
                const saveOne = await seriesQuestionOne(QuestionOne).save()
                const answerSave = await seriesanswer(answer).save()

                if (saveOne && answerSave) {
                    res.status(200).send(JSON.stringify({
                        status: true,
                        code: 1,
                        QNo: QNo,
                        message: `Question add `
                    }))
                } else {
                    res.status(200).send(JSON.stringify({
                        status: false,
                        code: 2,
                        message: `Unknow error in add to Question`
                    }))
                }
                return false
            }


            if (splitLanguage.length === 2) {
                console.log(data)
                const saveOne = await seriesQuestionOne(QuestionOne).save()
                const saveTwo = await seriesQuestiontwo(questionTwo).save()
                const answerSave = await seriesanswer(answer).save()

                if (saveOne && saveTwo && answerSave) {
                    res.status(200).send(JSON.stringify({
                        status: true,
                        code: 1,
                        QNo: QNo,
                        message: `Question add `
                    }))
                } else {
                    res.status(200).send(JSON.stringify({
                        status: false,
                        code: 2,
                        message: `Unknow error in add to Question`
                    }))
                }

                return false
            }

        } else {
            res.status(200).send(JSON.stringify({
                status: false,
                code: 3,
                message: `Total number of questions limit is complete. If any question is remaining, check the test, delete unwritten question, and enter the correct one.`
            }))
        }
    }

    //--------------------------------------------------------------------------
    const subject = () => {

    }

    //--------------------------------------------------------------------------

    if (data.type === "previous") {
        previous()
        return false
    }
    //--------------------------------------------------------------------------
    if (data.type === "series") {
        series()
        return false
    }
    //--------------------------------------------------------------------------
    if (data.type === "subject") {
        subject()
        return false
    }

}





module.exports = Question

