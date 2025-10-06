const {
    previousQuestionOne,
    previousQuestiontwo,
    answer

} = require("./../../model/previouspaper")



const deleteGroup = async (req, res) => {
    const data = req.body
    const find = await answer.find({ testcode: data.testCode, groupId: data.groupId }).select(`questionId -_id`)

    const checkdata = Object.keys(find).length

    if (checkdata === 0) {
        res.status(200).send(JSON.stringify({ status: true, code: 1, message: `Delete All Question of this group ${data.groupId}` }))
        return false;
    }

    if (checkdata > 0) {
        for (let i = 0; i < checkdata; i++) {
            const one = await previousQuestionOne.deleteOne(find[i])
            const two = await previousQuestiontwo.deleteOne(find[i])
            const ans = await answer.deleteOne(find[i])
        }

        res.status(200).send(JSON.stringify({ status: true, code: 1, message: `Delete All Question of this group ${data.groupId}` }))
        return false;
    }
}


const endGroup = async (req, res) => {
    const data = req.body
    const getQuestionId = await answer.find({ testcode: data.testCode, groupId: data.groupId })

    const checkdata = Object.keys(getQuestionId).length

    if (checkdata === 1) {
        res.status(200).send(JSON.stringify({
            status: false, 
            code: 2 , 
            message:"You have Only one input value, unable to update , Please delete group "
        }))

        return false;
    }



    for (let i = checkdata - 1; i >= 0; i--) {
        console.log(i)
        await answer.updateOne(
            {
                testcode: data.testCode,
                groupId: data.groupId,
                questionId: getQuestionId[i].questionId
            },
            {
                $set: {
                    questionCount: checkdata,
                    questionCountNo: checkdata - i
                }
            }
        )
    }

    res.status(200).send(JSON.stringify({
            status: true, 
            code: 1 , 
            message:"group Quetion is update"
        }))

}



// for (let i = checkdata - 1; i >= 0; i--) {
//         console.log(i)
//         await answer.updateOne({
//             testcode: data.testCode, groupId: data.groupId, questionId:getQuestionId[i].questionId
//         },
//     {
//                 $set: {
//                     questionCount: checkdata,
//                     questionCountNo: Number(i)+1
//                 }
//             })
//     }




module.exports = {
    deleteGroup,
    endGroup
}