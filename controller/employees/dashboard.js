const Dashboard= (req,res)=>{
    res.status(200).render('employees/dashboard',{
        appName: process.env.APP_NAME
    });
}

module.exports={Dashboard}