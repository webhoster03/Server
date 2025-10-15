const farmet = require("date-format")
const shortid = require("short-unique-id")
const uid = new shortid({ length: 32 })
const token = uid.rnd()
const key = uid.rnd()
const mail = require("./../mail")
const userSignup = require("./../../model/userSignup")




const Resend = async (req, res) => {
    const data = req.body

    const date = farmet("yyyy mm dd", new Date())
    const time = farmet("hh mm", new Date())

    const baseUrl = process.env.URL?.replace(/\/$/, ""); // remove trailing slash if exists
    const actionKey = `${baseUrl}/user/verification?user=${encodeURIComponent(data.mail)}&token=${encodeURIComponent(token)}&key=${encodeURIComponent(key)}`;

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


    const checkuser = await userSignup.updateOne({
        user_id: data.user_id,
        email: data.mail,
        name: data.name,
        token: data.token,
        key: data.key,
        status: data.status
    }, {
        $set: {
            token: token,
            key: key,
            date:date,
            time:time
        }
    })


    if (checkuser.acknowledged === false) {
        return res.status(401).json({ status: false, message: "User Authentication Error x07" })
    }
    if(checkuser.acknowledged === true){
        mail(data.mail, subject, message)
        return res.status(200).json({
            status: true,
            message: "your new verification link has been sent to your email",
            token: token,
            key: key,
        })
    }
    res.send(checkuser)
}

module.exports = Resend