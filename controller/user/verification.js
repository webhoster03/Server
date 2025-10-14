require("dotenv").config();
const userSignup = require("./../../model/userSignup");
const jwt = require("jsonwebtoken");

const Verification = async (req, res) => {
    const query = Object.assign({}, req.query);

    const mail = query.user;
    const token = query.token;
    const key = query.key;
    const appUrl = process.env.APP_URL;
    const userKey = process.env.USER_KEY;

    // Utility: check if within 15 minutes
    function isWithin15Minutes(savedDate, savedTime) {
        const savedDateTime = new Date(`${savedDate} ${savedTime}`);
        const now = new Date();
        const diffMinutes = (now - savedDateTime) / (1000 * 60);
        return diffMinutes <= 15;
    }

    // Validate all parameters
    if (
        !mail || mail === "undefined" || mail === "null" ||
        !token || token === "undefined" || token === "null" || token.length !== 32 ||
        !key || key === "undefined" || key === "null" || key.length !== 32
    ) {
        const params = new URLSearchParams({ status: false, response: 1 }).toString();
        return res.redirect(`${appUrl}/verification?${params}`);
    }

    // Find user by credentials
    const checkuser = await userSignup.findOne({ email: mail, token, key });
    if (!checkuser) {
        const params = new URLSearchParams({ status: false, response: 2 }).toString();
        return res.redirect(`${appUrl}/verification?${params}`);
    }

    // Validate token time
    const isValid = isWithin15Minutes(checkuser.date, checkuser.getTime);
    if (isValid) {
        // Token expired
        const params = new URLSearchParams({ status: false, response: 3 }).toString();
        return res.redirect(`${appUrl}/verification?${params}`);
    }

    // Update user as verified
    const update = await userSignup.updateOne(
        { email: mail },
        { $set: { token: "", key: "", status: 1 } }
    );
//
    if (!update.acknowledged) {
        const params = new URLSearchParams({ status: false, response: 4 }).toString();
        return res.redirect(`${appUrl}/verification?${params}`);
    }

    // Create JWT
    const userData = {
        user_id: checkuser.user_id,
        name: checkuser.name,
        email: checkuser.email,
        status: checkuser.status,
    };

    jwt.sign({ userData }, userKey, async(error, signedToken) => {
        if (error) {
            const params = new URLSearchParams({ status: false, response: 5 }).toString();
            return res.redirect(`${appUrl}/verification?${params}`);
        }

        // ✅ Success — redirect with token
        const params = new URLSearchParams({
            status: true,
            response: 5,
            token: signedToken,
            user_id: checkuser.user_id,
            name: checkuser.name,
            email: checkuser.email,
            code: 1,
        }).toString();

        return res.redirect(`${appUrl}/verification?${params}`);
    });
};

module.exports = Verification;
