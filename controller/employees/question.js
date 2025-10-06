
const Question=(req, res)=>{
    res.render("employees/question", {
        appName: process.env.APP_NAME,
        name: req.cookies.name,
        user: req.cookies.user,
        useruniqueid: req.cookies.useruniqueid,
        designation: req.cookies.designation
    })
}




module.exports ={
    Question
}