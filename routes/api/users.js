const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors, asyncHandler } = require("../../utils");
const { getUserToken, loginUser, checkAuth } = require('../../auth');
const router = express.Router();
const db = require("../../db/models");
const { User } = db;
// console.log(check.toString());

const validateEmailAndPassword = [
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username")
    .isLength({ max: 50 })
    .withMessage('Username must not be more than 50 characters long')
    .custom((value) => {
      return db.User.findOne({ where: { userName: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided username is already in use by another account');
          }
        });
    }),
  check("email")
    .isEmail()
    .withMessage("Please provide a valid email.")
    .isLength({ max: 255 })
    .withMessage('Email Address must not be more than 255 characters long')
    .custom((value) => {
      return db.User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password.")
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long'),
  check('confirmPassword')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    }),
];


//create user with hashedpassword
router.post(
  "/",
  validateEmailAndPassword,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    // console.log(req.body);
    const { userName, email, password, avatar } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userName, email, hashedPassword, avatar });
    const token = getUserToken(user);
    res.status(201).json({
      user: { id: user.id },
      token,
    });
    // loginUser(req, res, user);
    // res.redirect('/');
  })
);


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
    if (!user || !user.validatePassword(password)) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      return next(err);
    }

    // Token generation
    const token = getUserToken(user);
    res.cookie('accessToken', `${token}`, { httpOnly: true });
    res.json({ token, user: { id: user.id } });
  })
);


router.get('/:id/delete', checkAuth, asyncHandler(async (req, res, next) => {
  // Grab question to delete by id
  const userId = parseInt(req.params.id);
  const user = await User.findByPk(userId);
  const currentUserId = req.user.dataValues.id;
  // console.log(userId);
  // console.log(currentUserId);

  if (!currentUserId || user.id !== currentUserId) {
    res.status(403).send(`Can't delete user that is not you`);
    return;
  }

  await user.destroy();
  res.clearCookie('accessToken');
  res.render('banner', { title: 'Core Dump - Welcome' });

}));

router.post('/:id(\\d+)/delete', getUserToken,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    await user.destroy();
    res.clearCookie('accessToken');

    res.redirect(`/users`);
    res.status('200').end();
  }));


router.post('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.status('200').end();
});



module.exports = router;
