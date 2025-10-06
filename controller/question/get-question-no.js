const answer = require("./../../model/previouspaper").answer

const QuestionNo = async (req, res) => {
    const gettest = await answer.find({ testcode: req.body.getcodeid }).select("QNo -_id")
    if (Object.keys(gettest).length !== 0) {
        const getQueationNumber = gettest.at(-1).QNo
        res.status(200).send(JSON.stringify({ status: true, QNo: getQueationNumber }))
    }

}


module.exports = QuestionNo