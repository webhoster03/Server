// middlewares/adminAuth.js
require("dotenv").config()
const jwt = require("jsonwebtoken");

adminAuth= (req, res, next)=> {
    const auth = req.cookies?.adminAuth || null;

    // reject missing/placeholder tokens
    if (!auth || auth === "undefined" || auth === "null") {
        req.flash("message", "Inauthentic login not allowed");
        return res.redirect("/admin");
    }

    jwt.verify(auth, process.env.ADMIN_KEY, (err, decoded) => {
        if (err || !decoded) {
            req.flash("message", "Inauthentic login not allowed");
            return res.redirect("/admin");
        }

        // keep the decoded token handy if you need role/claims later
        req.adminToken = decoded;
        next();
    });
};

module.exports = adminAuth