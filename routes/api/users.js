// register account handler
// Session id handling using jwt
// log in handler

const express = require("express");
const bcrypt = require("bcryptjs");
const { validateEmailAndPassword, validateUsername, asyncHandler} = require("../../utils");
const router = express.Router();
const db = require("../../db/models");
const { User } = db;


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

	if( !user || !user.validatePassword(password)) {
	
	}

    // TODO: Password validation and error handling
	

    // TODO: Token generation
  })
);


module.exports = router;