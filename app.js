const express = require("express");
const { asyncHandler }= require('./utils');
const morgan = require("morgan");
const { environment } = require('./config');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const questionsRoute = require('./routes/api/questions');
const csrfProtection = csurf( { cookie: true });
const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'pug');
app.use(morgan("dev"));
app.use("/api/questions", questionsRoute);

app.get('/', (req, res) => {
  res.render('site-layout')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/postQuestion', csrfProtection, (req, res) => {
  let csrfToken = req.csrfToken();
  res.render('add-question', {csrfToken})
})

app.post('/postQuestion', (req, res) => {
  console.log("Hit the app.js app.post -- req.body:  ", req.body);
  next()
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
