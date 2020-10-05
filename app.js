const express = require("express");
const db = require('./db/models');
const { User, Question, Answer, Vote } = db;
const morgan = require("morgan");
const { environment } = require('./config');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('site-layout');
})

app.get('/login', (req, res) => {
  res.render('login');
})

app.get('/signup', (req, res) => {
  res.render('signup');
})

app.post('/search', asyncHandler(async(req, res, next) => {
  let { search } = req.body;         // Grab search value
  let relevantQuestions = [];
  search = search.toLowerCase();                              // Make it lowercase
  const questions = await Question.findAll();
  // Search through questions list to find relevant questions
  for (let i = 0; i < questions.length; i++) {
    let questionText = questions[i].questionText.toLowerCase();
    let questionSubject = questions[i].questionSubject.toLowerCase();

    if (questionText.includes(` ${search}`) || questionSubject.includes(` ${search}`)
     || questionText.startsWith(search)      || questionSubject.startsWith(search)) {
      relevantQuestions.push(questions[i]);
    }
  }

  if (relevantQuestions.length === 0) {
    relevantQuestions[0] = {
      questionSubject: `No results found`,
      questionText: `We couldn't find any results for your search! Try again!`
    };
  }
  res.render('search', { relevantQuestions });
}));

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
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
