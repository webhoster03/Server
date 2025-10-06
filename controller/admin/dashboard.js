const Dashboard= (req, res)=>{
    res.render("admin/dashboard", {
        appName: process.env.APP_NAME,
        name: req.cookies.name,
        user: req.cookies.user,
        adminid: req.cookies.adminid,
        role: req.cookies.role,
    })
}



module.exports = {
    Dashboard
}