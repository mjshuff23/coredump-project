const express = require("express");
const db = require('./db/models');
const { User, Question, Answer, Vote } = db;
const morgan = require("morgan");
const { environment, model } = require('./config');
const app = express();
const usersRouter = require("./routes/api/users");

const path = require('path');
const cookieParser = require('cookie-parser');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { searchRouter } = require('./routes/api/search');
const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);


// const { Question } = require('./db/models')
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/public')));

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/search', searchRouter);
app.use("/users", usersRouter);


//TODO: Get username from session Id
app.get('/', (req, res) => {
  res.render('banner')
})

app.get('/login', (req, res) => {
  res.render('login');
})

app.get('/signup', (req, res) => {
  res.render('signup');
})

app.get('/main', async (req, res) => {
  const topQuestions = await Question.findAll({ limit: 10, order: [['createdAt', 'DESC']] });
  res.render('main', { topQuestions })
})

app.get('/users', (req, res) => {
  res.render('user');
})

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

// Custom error handlers.

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  console.log(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
