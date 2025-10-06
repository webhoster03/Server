//Get Question Number
$(document).ready(() => {
    const getcodeid = localStorage.getItem("setcodeid")
    if (getcodeid !== null) {
        $.ajax({
            method: "post",
            url: "question/getquestionno",
            data: { getcodeid: getcodeid },
            success: function (getresponse) {
                const response = JSON.parse(getresponse)
                if (response.status === true) {
                    const nextQNo = Number(response.QNo) + 1;
                    const formattedQNo = nextQNo < 10 ? " 0" + nextQNo : nextQNo;
                    $("#showQuestionNumber").empty().append(" " + formattedQNo);
                }
            }
        });
    }
})














//Add Question
$(document).ready(() => {

    const language = localStorage.getItem("language")
    if (language === null || language === "null") {
        return false
    }

    const splitLanguage = language.split("\n").sort()





    var questionOneSeccuss
    var questionOneSeccussOne
    var questionOneSeccussTwo
    var questionOneSeccussThree
    var questionOneSeccussFour
    var questionOne
    var questionOneOptionOne
    var questionOneOptiontwo
    var questionOneOptionthree
    var questionOneOptionfour

    var questionTwoSeccuss
    var questionTwoSeccussOne
    var questionTwoSeccussTwo
    var questionTwoSeccussThree
    var questionTwoSeccussFour
    var questionTwo
    var questionTwoOptionOne
    var questionTwoOptiontwo
    var questionTwoOptionthree
    var questionTwoOptionfour

    var answer
    var answer_status

    var dataOne
    var dataTwo


    const showErrorInfo = (message, bgcolor) => {
        $("#submitQuestion").prop("disabled", false);
        $(".showErrorMainContainer").append(`
            <div class="showErrorBox">
                <div class="showErrorMessageBox">
                    ${message}
                </div>
                <div class="showErrorCloseBox">
                    <button>X</button>
                </div>
            </div>
            `)
        $(".showErrorBox").css("backgroundColor", bgcolor)
        $(".showErrorBox").stop(true, true).fadeIn(100).delay(9000).fadeOut(100)

    }



    const QuestionOne = () => {
        //Question One
        questionOne = CKEDITOR.instances['questionOne'].getData().trim()
        if (questionOne.length === 0) {
            showErrorInfo(`Enter Question in ${splitLanguage[0]} language`, "#800000", false)
            questionOneSeccuss = false
        } else if (questionOne.length > 0) {
            questionOneSeccuss = true
        }
        else {
            showErrorInfo("unknow Error in Question One", "#800000")
            questionOneSeccuss = false
        }

        // first langauge option One
        questionOneOptionOne = $("#LanguageOneOptionOne").val().trim() || CKEDITOR.instances['input-languageOne-for-one'].getData().trim()
        if (questionOneOptionOne.length === 0) {
            showErrorInfo(`Enter Option A in ${splitLanguage[0]} language`, "#800000")
            questionOneSeccussOne = false
        }
        else if (questionOneOptionOne.length > 0) {
            questionOneSeccussOne = true
        }
        else {
            showErrorInfo(`Unknow error in Option A ${splitLanguage[0]} language`, "#800000")
            questionOneSeccussOne = false
        }


        // first langauge option two
        questionOneOptiontwo = $("#LanguageOneOptiontwo").val().trim() || CKEDITOR.instances['input-languageOne-for-two'].getData().trim()
        if (questionOneOptiontwo.length === 0) {
            showErrorInfo(`Enter Option B in ${splitLanguage[0]} language`, "#800000")
            questionOneSeccussTwo = false
        }
        else if (questionOneOptiontwo.length > 0) {
            questionOneSeccussTwo = true
        }
        else {
            showErrorInfo(`Unknow error in Option B ${splitLanguage[0]} language`, "#800000")
            questionOneSeccussTwo = false
        }



        // first langauge option three
        questionOneOptionthree = $("#LanguageOneOptionthree").val().trim() || CKEDITOR.instances['input-languageOne-for-three'].getData().trim()
        if (questionOneOptionthree.length === 0) {
            showErrorInfo(`Enter Option C in ${splitLanguage[0]} language`, "#800000")
            questionOneSeccussThree = false
        }
        else if (questionOneOptionthree.length > 0) {
            questionOneSeccussThree = true
        }
        else {
            showErrorInfo(`Unknow error in Option C ${splitLanguage[0]} language`, "#800000")
            questionOneSeccussThree = false
        }



        // first langauge option four
        questionOneOptionfour = $("#LanguageOneOptionfour").val().trim() || CKEDITOR.instances['input-languageOne-for-four'].getData().trim()
        if (questionOneOptionfour.length === 0) {
            showErrorInfo(`Enter Option D in ${splitLanguage[0]} language`, "#800000")
            questionOneSeccussFour = false
        }
        else if (questionOneOptionfour.length > 0) {
            questionOneSeccussFour = true
        }
        else {
            showErrorInfo(`Unknow error in Option D ${splitLanguage[0]} language`, "#800000")
            questionOneSeccussFour = false
        }

        //Answer 
        answer = $("#answer").val().trim()

        if (answer.length === 0) {
            answer_status = false
            showErrorInfo(`Enter Answer `, "#800000")
        } else if (answer.replace(/[^abcd]/gi, '') !== $("#answer").val()) {
            answer_status = false
            showErrorInfo(`Allow only a b c d alphabet`, "#800000")
        } else if (answer.length > 1) {
            answer_status = false
            showErrorInfo(`Allow only one alphabet (a b c d)`, "#800000")
        }
        else if (answer.length === 1) {
            answer_status = true

        }
        else {
            answer_status = false
            showErrorInfo(`Unknow error in answer`, "#800000")
        }

        dataOne = {
            questionOne: questionOne,
            questionOneOptionOne: questionOneOptionOne,
            questionOneOptiontwo: questionOneOptiontwo,
            questionOneOptionthree: questionOneOptionthree,
            questionOneOptionfour: questionOneOptionfour,
            answer: answer
        }
    }



    const Questiontwo = () => {
        //Question two
        questionTwo = CKEDITOR.instances['questionTwo'].getData().trim()
        if (questionTwo.length === 0) {
            showErrorInfo(`Enter Question in ${splitLanguage[1]} language`, "#800000")
            questionTwoSeccuss = false
        } else if (questionTwo.length > 0) {
            questionTwoSeccuss = true
        }
        else {
            showErrorInfo(`unknow Error in ${splitLanguage[1]} language`, "#800000")
            questionTwoSeccuss = false
        }

        // first langauge option One
        questionTwoOptionOne = $("#LanguageTwoOptionOne").val().trim() || CKEDITOR.instances['input-languageTwo-for-one'].getData().trim()
        if (questionTwoOptionOne.length === 0) {
            showErrorInfo(`Enter Option A in ${splitLanguage[1]} language`, "#800000")
            questionTwoSeccussOne = false
        }
        else if (questionTwoOptionOne.length > 0) {
            questionTwoSeccussOne = true
        }
        else {
            showErrorInfo(`Unknow error in Option A ${splitLanguage[1]} language`, "#800000")
            questionTwoSeccussOne = false
        }


        // first langauge option two
        questionTwoOptiontwo = $("#LanguageTwoOptionTwo").val().trim() || CKEDITOR.instances['input-languageTwo-for-two'].getData().trim()
        if (questionTwoOptiontwo.length === 0) {
            showErrorInfo(`Enter Option B in ${splitLanguage[1]} language`, "#800000")
            questionTwoSquestionTwoSeccussTwoeccuss = false
        }
        else if (questionTwoOptiontwo.length > 0) {
            questionTwoSeccussTwo = true
        }
        else {
            showErrorInfo(`Unknow error in Option B ${splitLanguage[1]} language`, "#800000")
            questionTwoSeccussTwo = false
        }



        // first langauge option three
        questionTwoOptionthree = $("#LanguageTwoOptionThree").val().trim() || CKEDITOR.instances['input-languageTwo-for-three'].getData().trim()
        if (questionTwoOptionthree.length === 0) {
            showErrorInfo(`Enter Option C in ${splitLanguage[1]} language`, "#800000")
            questionTwoSeccussThree = false
        }
        else if (questionTwoOptionthree.length > 0) {
            questionTwoSeccussThree = true
        }
        else {
            showErrorInfo(`Unknow error in Option C ${splitLanguage[1]} language`, "#800000")
            questionTwoSeccussThree = false
        }



        // first langauge option four
        questionTwoOptionfour = $("#LanguageTwoOptionFour").val().trim() || CKEDITOR.instances['input-languageTwo-for-four'].getData().trim()
        if (questionTwoOptionfour.length === 0) {
            showErrorInfo(`Enter Option D in ${splitLanguage[1]} language`, "#800000")
            questionTwoSeccussFour = false
        }
        else if (questionTwoOptionfour.length > 0) {
            questionTwoSeccussFour = true
        }
        else {
            showErrorInfo(`Unknow error in Option D ${splitLanguage[1]} language`, "#800000")
            questionTwoSeccussFour = false
        }

        dataTwo = {
            questionTwo: questionTwo,
            questionTwoOptionOne: questionTwoOptionOne,
            questionTwoOptiontwo: questionTwoOptiontwo,
            questionTwoOptionthree: questionTwoOptionthree,
            questionTwoOptionfour: questionTwoOptionfour
        }
    }


    const checkGroupCount = () => {
        const groupRemainCount = localStorage.getItem("groupRemainCount")
        localStorage.getItem("groupCount")
        localStorage.getItem("groupId")


        if (Number(groupRemainCount) !== 0) {
            $("#groupCount").show()
            $("#groupCounter").empty().append(Number(localStorage.getItem("groupRemainCount") - 1))
            $("#totalGroupnumber").empty().append(localStorage.getItem("groupCount"))
        }

        if (Number(groupRemainCount) > 0) {
            localStorage.removeItem("groupRemainCount")
            localStorage.setItem("groupRemainCount", (Number(groupRemainCount) - 1))
        }

        if (Number(groupRemainCount) === 1) {
            localStorage.removeItem("groupCount")
            localStorage.removeItem("groupId")
            $("#groupCount").hide()
        }


    }


    const ClearOldErrorMessage = () => {
        $(".showErrorMainContainer").empty() //empty this old error messages
        $(".showErrorMainContainer").hide()
        $(".showErrorMainContainer").show(200)
    }

    const ClearQuestionOne = () => {

        $("#questionOne").val("")
        $("#LanguageOneOptionOne").val("")
        $("#LanguageOneOptiontwo").val("")
        $("#LanguageOneOptionthree").val("")
        $("#LanguageOneOptionfour").val("")
        $("#answer").val("")

        CKEDITOR.instances['questionOne'].setData()
        CKEDITOR.instances['input-languageOne-for-one'].setData()
        CKEDITOR.instances['input-languageOne-for-two'].setData()
        CKEDITOR.instances['input-languageOne-for-three'].setData()
        CKEDITOR.instances['input-languageOne-for-four'].setData()

    }



    const clearQuestiontwo = () => {

        $("#questionTwo").val("")
        $("#LanguageTwoOptionOne").val("")
        $("#LanguageTwoOptionTwo").val("")
        $("#LanguageTwoOptionThree").val("")
        $("#LanguageTwoOptionFour").val("")

        CKEDITOR.instances['questionTwo'].setData()
        CKEDITOR.instances['input-languageTwo-for-one'].setData()
        CKEDITOR.instances['input-languageTwo-for-two'].setData()
        CKEDITOR.instances['input-languageTwo-for-three'].setData()
        CKEDITOR.instances['input-languageTwo-for-four'].setData()
    }



    const previous = () => {
        const examid = localStorage.getItem("examid")
        const paperid = localStorage.getItem("paperid")

        const examname = localStorage.getItem("examname")
        const papernamem = localStorage.getItem("papernamem")
        const year = localStorage.getItem("year")
        const type = localStorage.getItem("type")
        const remarks = localStorage.getItem("remarks")
        const setcodeid = localStorage.getItem("setcodeid")
        const language = localStorage.getItem("language")

        const groupCount = localStorage.getItem("groupCount") || 0
        const groupRemainCount = localStorage.getItem("groupRemainCount") || 0
        const groupId = localStorage.getItem("groupId") || 0


        if (
            examid === null || examid === "null" || examid.length === 0 ||
            paperid === null || paperid === "null" || paperid.length === 0 ||
            examname === null || examname === "null" || examname.length === 0 ||
            papernamem === null || papernamem === "null" || papernamem.length === 0 ||
            year === null || year === "null" || year.length === 0 ||
            type === null || type === "null" || type.length === 0 ||
            setcodeid === null || setcodeid === "null" || setcodeid.length === 0 ||
            language === null || language === "null" || language.length === 0
        ) {
            alert("Some value is missing in question meta data")
            return false
        }

        questionData = {
            examid: examid,
            paperid: paperid,
            examname: examname,
            papernamem: papernamem,
            year: year,
            type: type,
            remarks: remarks,
            setcodeid: setcodeid,
            language: language
        }

        groupdata = {
            groupCount: groupCount,
            groupRemainCount: groupRemainCount,
            groupId: groupId
        }




        if (splitLanguage.length === 1) {

            QuestionOne()


            if (questionOneSeccuss
                && questionOneSeccussOne
                && questionOneSeccussTwo
                && questionOneSeccussThree
                && questionOneSeccussFour
                && answer_status) {
                $.ajax({
                    method: "post",
                    url: "/question",
                    data: { ...questionData, ...dataOne, ...groupdata },
                    success: function (getresponse) {
                        const response = JSON.parse(getresponse)
                        if (response.status === true && response.code === 1) {
                            const nextQNo = Number(response.QNo) + 1;
                            const formattedQNo = nextQNo < 10 ? "0" + nextQNo : nextQNo;
                            $("#showQuestionNumber").empty().append(formattedQNo);// show current Question Number
                            ClearOldErrorMessage()
                            showErrorInfo(response.message, "#008000") //show error
                            checkGroupCount() //hendle Group question 
                            ClearQuestionOne() //clear question Form
                        }
                        else if (response.status === false && response.code === 2) {
                            ClearOldErrorMessage()
                            showErrorInfo(response.message, "#800000")
                        }
                        else if (response.status === false && response.code === 3) {
                            ClearOldErrorMessage()
                            singlePopClose(response.message, response.status);
                        }
                        else {
                            showErrorInfo(`Unknow Error `, "#800000")
                        }

                    }
                });
            }
            return false

        }



        if (splitLanguage.length === 2) {
            QuestionOne()
            Questiontwo()


            if (questionOneSeccuss
                && questionOneSeccussOne
                && questionOneSeccussTwo
                && questionOneSeccussThree
                && questionOneSeccussFour
                && questionTwoSeccuss
                && questionTwoSeccussOne
                && questionTwoSeccussTwo
                && questionTwoSeccussThree
                && questionTwoSeccussFour
                && answer_status) {
                $.ajax({
                    method: "post",
                    url: "/question",
                    data: { ...questionData, ...dataOne, ...dataTwo, ...groupdata },
                    success: function (getresponse) {
                        const response = JSON.parse(getresponse)
                        if (response.status === true && response.code === 1) {
                            const nextQNo = Number(response.QNo) + 1;
                            const formattedQNo = nextQNo < 10 ? "0" + nextQNo : nextQNo;
                            $("#showQuestionNumber").empty().append(formattedQNo);
                            ClearOldErrorMessage() //clear old messages
                            showErrorInfo(response.message, "#008000") //show error message
                            checkGroupCount() // check grounp count
                            ClearQuestionOne() //clear question form
                            clearQuestiontwo() //clear question form
                        }
                        else if (response.status === false && response.code === 2) {
                            ClearOldErrorMessage() // check grounp count
                            showErrorInfo(response.message, "#800000") //show error message
                        }
                        else if (response.status === false && response.code === 3) {
                            ClearOldErrorMessage() // check grounp count
                            singlePopClose(response.message, response.status); //show error message
                        }
                        else {
                            showErrorInfo(`Unknow Error `, "#800000") //show error message
                        }

                    }
                });
            }
            return false
        }



    }

    const series = () => {

        const examid = localStorage.getItem("examid")
        const paperid = localStorage.getItem("paperid")

        const examname = localStorage.getItem("examname")
        const papernamem = localStorage.getItem("papernamem")
        const seriesno = localStorage.getItem("seriesno")
        const seriescode = localStorage.getItem("seriescode")
        const type = localStorage.getItem("type")
        const remarks = localStorage.getItem("remarks")
        const setcodeid = localStorage.getItem("setcodeid")
        const language = localStorage.getItem("language")

        const groupCount = localStorage.getItem("groupCount") || 0
        const groupRemainCount = localStorage.getItem("groupRemainCount") || 0
        const groupId = localStorage.getItem("groupId") || 0


        if (
            examid === null || examid === "null" || examid.length === 0 ||
            paperid === null || paperid === "null" || paperid.length === 0 ||
            examname === null || examname === "null" || examname.length === 0 ||
            papernamem === null || papernamem === "null" || papernamem.length === 0 ||
            seriesno === null || seriesno === "null" || seriesno.length === 0 ||
            seriescode === null || seriescode === "null" || seriescode.length === 0 ||
            type === null || type === "null" || type.length === 0 ||
            setcodeid === null || setcodeid === "null" || setcodeid.length === 0 ||
            language === null || language === "null" || language.length === 0
        ) {
            alert("Some value is missing in question meta data")
            return false
        }

        questionData = {
            examid: examid,
            paperid: paperid,
            examname: examname,
            papernamem: papernamem,
            seriesno: seriesno,
            seriescode: seriescode,
            type: type,
            remarks: remarks,
            setcodeid: setcodeid,
            language: language
        }

        groupdata = {
            groupCount: groupCount,
            groupRemainCount: groupRemainCount,
            groupId: groupId
        }

        if (splitLanguage.length === 1) {
            QuestionOne()


            if (questionOneSeccuss
                && questionOneSeccussOne
                && questionOneSeccussTwo
                && questionOneSeccussThree
                && questionOneSeccussFour
                && answer_status) {
                $.ajax({
                    method: "post",
                    url: "/question",
                    data: { ...questionData, ...dataOne, ...groupdata },
                    success: function (getresponse) {
                        const response = JSON.parse(getresponse)
                        if (response.status === true && response.code === 1) {
                            const nextQNo = Number(response.QNo) + 1;
                            const formattedQNo = nextQNo < 10 ? "0" + nextQNo : nextQNo;
                            $("#showQuestionNumber").empty().append(formattedQNo);
                            ClearOldErrorMessage() //clear old messages
                            showErrorInfo(response.message, "#008000") //show error message
                            checkGroupCount() // check grounp count
                            ClearQuestionOne() //clear question form
                        }
                        else if (response.status === false && response.code === 2) {
                            ClearOldErrorMessage() // check grounp count
                            showErrorInfo(response.message, "#800000") //show error message
                        }
                        else if (response.status === false && response.code === 3) {
                            ClearOldErrorMessage() // check grounp count
                            singlePopClose(response.message, response.status); //show error message
                        }
                        else {
                            showErrorInfo(`Unknow Error `, "#800000") //show error message
                        }
                    }
                });
            }
            return false
        }


        if (splitLanguage.length === 2) {
            QuestionOne()
            Questiontwo()
            if (questionOneSeccuss
                && questionOneSeccussOne
                && questionOneSeccussTwo
                && questionOneSeccussThree
                && questionOneSeccussFour
                && questionTwoSeccuss
                && questionTwoSeccussOne
                && questionTwoSeccussTwo
                && questionTwoSeccussThree
                && questionTwoSeccussFour
                && answer_status) {
                $.ajax({
                    method: "post",
                    url: "/question",
                    data: { ...questionData, ...dataOne, ...dataTwo, ...groupdata },
                    success: function (getresponse) {
                        const response = JSON.parse(getresponse)
                        if (response.status === true && response.code === 1) {
                            const nextQNo = Number(response.QNo) + 1;
                            const formattedQNo = nextQNo < 10 ? "0" + nextQNo : nextQNo;
                            $("#showQuestionNumber").empty().append(formattedQNo);
                            ClearOldErrorMessage() //clear old messages
                            showErrorInfo(response.message, "#008000") //show error message
                            checkGroupCount() // check grounp count
                            ClearQuestionOne() //clear question form
                            clearQuestiontwo() //clear question form
                        }
                        else if (response.status === false && response.code === 2) {
                            ClearOldErrorMessage() // check grounp count
                            showErrorInfo(response.message, "#800000") //show error message
                        }
                        else if (response.status === false && response.code === 3) {
                            ClearOldErrorMessage() // check grounp count
                            singlePopClose(response.message, response.status); //show error message
                        }
                        else {
                            showErrorInfo(`Unknow Error `, "#800000") //show error message
                        }
                    }
                });
            }
            return false
        }
    }

    // const subject = () => {
    // }

    $("#submitQuestion").on("click", () => {
        const type = localStorage.getItem("type")

        if (type === null || type === "null" || type.length === 0) {
            alert("your test type is not set")
            return false;
        }

        $("#submitQuestion").prop("disabled", true); //complete the code uncommant this line

        if (type === "previous") {
            previous()
        }

        if (type === "series") {
            series()
        }




    })
})










