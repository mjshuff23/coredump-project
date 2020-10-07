

// const { environment, model } = require('./config');


// app.set('view engine', 'pug');
// const path = require('path');
// app.use(express.static(path.join(__dirname, '/public')));

// app.use(cookieParser());
// app.use(morgan("dev"));
// app.use(express.json());
// app.use("/search", searchRouter);
// app.use("/users", usersRouter);
// app.use("/questions", questionsRoute);



const express = require("express");
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const csrfProtection = csurf( { cookie: true });

const questionsRoute = require('./routes/api/questions');
const { searchRouter } = require('./routes/api/search');
const usersRouter = require("./routes/api/users");
const db = require('./db/models');
const { User, Question, Answer, Vote } = db;
const morgan = require("morgan");
const { asyncHandler } = require('./utils');
const { environment, model } = require('./config');


const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'pug');

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use('/search', searchRouter);
app.use("/users", usersRouter);
app.use("/questions", questionsRoute);

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

app.get('/postQuestion', csrfProtection, (req, res) => {
  let csrfToken = req.csrfToken();
  res.render('add-question', {csrfToken})
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
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
