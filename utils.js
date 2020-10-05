const { check } = require("express-validator");

const validateUsername =
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username");

const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
];

const asyncHandler = (handler) => {
	return (req, res, next) => {
		return (req, res, next).catch(next);
	}
}

module.exports = {
	validateEmailAndPassword,
	validateUsername,
	asyncHandler
}