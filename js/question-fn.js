var splitLanguage
$(document).ready(() => {
    const language = localStorage.getItem("language")
    if (language === null || language === "null") {
        return false
    }

    splitLanguage = language.split("\n").sort()

    if (splitLanguage.length === 1) {
        $("#showFirstLanguageName").append(splitLanguage[0])
        return false
    }

    if (splitLanguage.length === 2) {
        $("#secondLanguageContainer").show()
        $("#showFirstLanguageName").append(splitLanguage[0])
        $("#showSceondLanguageName").append(splitLanguage[1])
        return false
    }


})



//toggle and find null fields

const QuestionOne = () => {
    $("#firstLangauageInpitContainer").toggle()
    $("#firstTextareaInputContainer").toggle()

    $("#LanguageOneOptionOne").val("")
    $("#LanguageOneOptiontwo").val("")
    $("#LanguageOneOptionthree").val("")
    $("#LanguageOneOptionfour").val("")

    CKEDITOR.instances['input-languageOne-for-one'].setData()
    CKEDITOR.instances['input-languageOne-for-two'].setData()
    CKEDITOR.instances['input-languageOne-for-three'].setData()
    CKEDITOR.instances['input-languageOne-for-four'].setData()

}



const Questiontwo = () => {
    $("#sceondLangauageInpitContainer").toggle()
    $("#sceondTextareaInputContainer").toggle()

    $("#LanguageTwoOptionOne").val("")
    $("#LanguageTwoOptionTwo").val("")
    $("#LanguageTwoOptionThree").val("")
    $("#LanguageTwoOptionFour").val("")

    CKEDITOR.instances['input-languageTwo-for-one'].setData()
    CKEDITOR.instances['input-languageTwo-for-one'].setData()
    CKEDITOR.instances['input-languageTwo-for-two'].setData()
    CKEDITOR.instances['input-languageTwo-for-three'].setData()
    CKEDITOR.instances['input-languageTwo-for-four'].setData()
}







$(document).ready(() => {
    $("#toggleToArea").on("click", () => {
        if (splitLanguage.length === 1) {
            QuestionOne()
            return false
        }

        if (splitLanguage.length === 2) {
            QuestionOne()
            Questiontwo()
            return false
        }

    })
})

