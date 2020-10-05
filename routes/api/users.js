// register account handler
// Session id handling using jwt
// log in handler

const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { validateEmailAndPassword, validateUsername, asyncHandler} = require("../../utils");
const {getUserToken, requireAuth} = require('./auth');
const router = express.Router();
const db = require("../../db/models");
const { User } = db;

//create user with hashedpassword
router.post(
    "/",
    check("username")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a username"),
    validateEmailAndPassword,
    asyncHandler(async (req, res) => {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, hashedPassword });
  
      const token = getUserToken(user);
      res.status(201).json({
        user: { id: user.id },
        token,
      });
    })
  );

  User.prototype.validatePassword = function (password) {
	return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

router.post(
  "/token",
  validateEmailAndPassword,
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

	// Password validation and error handling
	if( !user || !user.validatePassword(password)) {
		const err = new Error("Login failed");
		err.status = 401;
		err.title = "Login failed";
		err.errors = ["The provided credentials were invalid."];
		return next(err);
	}	

    // Token generation
	const token = getUserToken(user);
	res.json({ token, user: {id: user.id}});
  })
);


module.exports = router;