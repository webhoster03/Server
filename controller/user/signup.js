require("dotenv").config()
const { validationResult } = require("express-validator");
const userSignup = require("./../../model/userSignup")
const format = require("date-format")
const shortid = require("short-unique-id")
const user_id = new shortid({ length: 16 })
const token = new shortid({ length: 32 })
const key = new shortid({ length: 32 })
const bcrypt = require("bcryptjs")
const solt = bcrypt.genSaltSync(14);
const jwt = require("jsonwebtoken");
const userkey = process.env.USER_KEY
const mail = require("./../mail")

/*
    0 = pending
    1 = active
    2 = pause
    3 = blocked
 */


const Signup = async (req, res) => {
    const data = req.body

    const sendToken = token.rnd()
    const sendKey = key.rnd()
    const baseUrl = process.env.URL?.replace(/\/$/, ""); // remove trailing slash if exists
    const actionKey = `${baseUrl}/user/verification?user=${encodeURIComponent(data.mail)}&token=${encodeURIComponent(sendToken)}&key=${encodeURIComponent(sendKey)}`;



    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(202).json({ error: error.array() })
    }



    const ip = req.ip.startsWith("::ffff:") ? req.ip.replace("::ffff:", "") : req.ip;

    const user = {
        user_id: user_id.rnd(),
        token: sendToken,
        key: sendKey,
        name: data.name,
        email: data.mail,
        password: bcrypt.hashSync(data.password, solt),
        status: 0,
        date: format("yyyy mm dd", new Date()),
        time: format("hh mm", new Date()),
        ip: ip
    }

    const subject = `ExamHall Account Verification Link`
    const message = `
    <!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>ExamHall Account Verification</title>
</head>

<body style="margin:0;background-color:#f5f6fa;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f5f6fa;padding:30px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0"
                    style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,0.1);">
                    <tr>
                        <td style="padding:30px;">
                            <!-- Header -->
                            <h2 style="color:#0b5fff;margin:0 0 10px 0;text-align:center;font-size:24px;">Welcome to
                                ExamHall</h2>
                            <p style="color:#444;text-align:center;font-size:14px;margin:0 0 20px 0;">
                                Hi <strong>${data.name}</strong>, thank you for creating an account on ExamHall.
                            </p>

                            <!-- Message -->
                            <p style="color:#333;font-size:15px;line-height:1.6;margin-bottom:25px;text-align:center;">
                                To complete your registration and access your courses, please verify your email address
                                by clicking the button below. this link is valid only 15 minutes
                            </p>

                            <!-- Verify Button -->
                            <div style="text-align:center;margin:25px 0;">
                                <a href=${actionKey} style="background-color:#0b5fff;color:#ffffff;text-decoration:none;padding:14px 28px;
                            border-radius:6px;font-weight:bold;display:inline-block;font-size:15px;">
                                    Verify Your Account
                                </a>
                            </div>

                            <!-- Alternate link -->
                            <p style="font-size:13px;color:#666;line-height:1.6;text-align:center;">
                                If the button above doesn’t work, copy and paste this link into your browser:
                            </p>
                            <p style="font-size:13px;color:#0b5fff;word-break:break-all;text-align:center;">
                                {{${actionKey}}}
                            </p>

                            <!-- Instructions -->
                            <p style="color:#333;font-size:14px;line-height:1.6;text-align:center;margin:25px 0;">
                                After verifying your account, return to the website, click <strong>Reload</strong>,
                                and proceed to the <strong>Course</strong> page to continue.
                            </p>

                            <!-- Support -->
                            <p style="font-size:13px;color:#777;text-align:center;">
                                Didn’t create this account? Ignore this email or contact us at
                                <a href="mailto:support@examhall.com"
                                    style="color:#0b5fff;text-decoration:none;">support@examhall.com</a>.
                            </p>

                            <!-- Footer -->
                            <hr style="border:none;border-top:1px solid #eee;margin:30px 0;" />
                            <p style="text-align:center;font-size:12px;color:#999;margin:0;">
                                © 2025 ExamHall. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
    `

    const checkuser = await userSignup.findOne({ email: data.mail })


    if (checkuser === null) {

        const savedata = await new userSignup(user).save()
        const respone = savedata.toObject()
        delete respone.password
        delete respone._id
        delete respone.__v
        delete respone.date
        delete respone.time
        delete respone.ip


        jwt.sign({ respone }, userkey, (err, token) => {
            if (err) {
                return res.status(202).send({ status: false, message: "user authentication key not assigned , to Re-sign again" })
            }
            if (token) {
                mail(data.mail, subject, message)
                res.status(200).send({ status: true, signtoken: token, respone: respone })
            } else {
                return res.status(202).send({ status: false, message: "user authentication key not assigned , to Re-sign again" })
            }

        })
    } else {
        if (Number(checkuser.status) === 0) {
            const updateuser = await userSignup.updateOne({ email: data.mail }, {
                $set: {
                    user_id: user_id.rnd(),
                    token: sendToken,
                    key: sendKey,
                    name: data.name,
                    email: data.mail,
                    password: bcrypt.hashSync(data.password, solt),
                    status: 0,
                    date: format("yyyy mm dd", new Date()),
                    time: format("hh mm", new Date()),
                    ip: ip
                }
            })

            if (updateuser.modifiedCount > 0 && updateuser.matchedCount > 0 && updateuser.acknowledged === true) {
                const finduser = await userSignup.findOne({ email: data.mail })
                const respone = finduser.toObject()
                delete respone.password
                delete respone._id
                delete respone.__v
                delete respone.date
                delete respone.time
                delete respone.ip

                console.log(respone)

                jwt.sign({ respone }, userkey, (err, token) => {
                    if (err) {
                        return res.status(202).send({ status: false, message: "user authentication key not assigned , to Re-sign again" })
                    }
                    if (token) {
                        mail(data.mail, subject, message)
                        res.status(200).send({ status: true, signtoken: token, respone: respone })
                    } else {
                        return res.status(202).send({ status: false, message: "user authentication key not assigned , to Re-sign again" })
                    }

                })
            }
            return false
        }
        if (Number(checkuser.status) === 1) {
            res.status(202).send({ status: false, message: "user already exists" })
            return false
        }
        if (Number(checkuser.status) === 2) {
            res.status(202).send({ status: false, message: "this User is pause" })
            return false
        }
        if (Number(checkuser.status) === 3) {
            res.status(202).send({ status: false, message: "this User is paremanently blocked" })
            return false
        }

    }



}

module.exports = Signup

