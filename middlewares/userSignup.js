const { body } = require("express-validator");

const signupvalidate = [
    body("name")
        .not().isEmpty().withMessage("Enter your name.").bail()
        .isLength({ min: 3 }).withMessage("Minimum character length is 3.").bail()
        .isLength({ max: 20 }).withMessage("Maximum character length is 20."),

    body("mail")
        .not().isEmpty().withMessage("Enter your E-mail address").bail()
        .isEmail().withMessage("Your Email format is not valid."),

    body("password")
        .not().isEmpty().withMessage("Enter your password").bail()
        .isLength({ min: 6 }).withMessage("Enter password at least 6 characters.").bail()
        .isLength({ max: 25 }).withMessage("Maximum password length is 25 characters."),

    body("verify")
        .not().isEmpty().withMessage("Enter your verify password").bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
];

module.exports = signupvalidate;
