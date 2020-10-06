const express = require("express");
const morgan = require("morgan");
const { environment, db } = require('./config');
const app = express();

const path = require('path');

const db = require('./db/models')
const cookieParser = require('cookie-parser');

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/public')));

app.use(cookieParser());

app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.render('banner')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/main', async (req, res) => {
  const topQuestion = await db.question.findAll();
  res.render('main', { topQuestion })
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
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
