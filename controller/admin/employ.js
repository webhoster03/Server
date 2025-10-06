const employ = require("./../../model/employ")
const format = require("date-format")
const shortid = require("short-unique-id")
const uniqueid= new shortid({length:10})
const bcrypt = require("bcryptjs")
const solt = bcrypt.genSaltSync(14);


const Employ = (req, res) => {
    res.render("admin/employ", {
        appName: process.env.APP_NAME,
        name: req.cookies.name,
        user: req.cookies.user,
        adminid: req.cookies.adminid,
        role: req.cookies.role,
    })

}



const Addemploy = async (req, res) => {
    const data = req.body
    const checkuser = await employ.find({
        $or: [
            { userid: data.userid },
            { mail: data.mailid },
            { contact: data.mailid }
        ]
    })
    if (Object.keys(checkuser).length > 0) {
        res.status(200).send(JSON.stringify({
            status: false, message: `
            this user details is already exist User Id : ${checkuser.userid} , 
            E-mail Id ${checkuser.mail} and Contact Number is ${checkuser.contact}
            `}))
        return false
    }
const ip = req.ip.startsWith("::ffff:") ? req.ip.replace("::ffff:", "") : req.ip;
    const info = {
        name: data.employname,
        mail: data.mailid,
        contact: data.contactno,
        dob: data.dob,
        joinning: data.joiningdate,
        userid: data.userid,
        useruniqueid: uniqueid.rnd(),
        password: bcrypt.hashSync(data.password, solt),
        designation: data.designation,
        remarks: data.remarks,
        createby: data.name,
        creatorid: data.adminid,
        active: "1",
        date: format("yyyy mm dd", new Date()),
        time: format("hh mm", new Date()),
        ip: ip
    }
    
    const savedata= await employ(info).save()

    if(savedata){
        res.status(200).send(JSON.stringify({status: true, message: "New employ is added is added"}))
    }else{
        res.status(200).send(JSON.stringify({status: true, message: "Employ is  not added"}))
    }
}


module.exports = {
    Employ,
    Addemploy
}