/*
    In the mail require 3 parameter use's mail id subject and content
 */
const nodemailer= require("nodemailer")

const Mail = (userName, subject ,message) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'photoshooter198@gmail.com',
            pass: 'bfpg lxky wwsb flts'
        }
    });
    var mailOptions = {
        from: 'photoshooter198@gmail.com',
        to: userName,
        subject: subject,
        html: message
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = Mail