const express = require("express");
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const csrfProtection = csurf({ cookie: true });

const { questionsRoute, countQuestionVotes, countVotes } = require('./routes/api/questions');
const { searchRouter } = require('./routes/api/search');
const usersRouter = require("./routes/api/users");
const answersRouter = require('./routes/api/answers');
const db = require('./db/models');
const { User, Question, Answer, AnswerVote } = db;
const morgan = require("morgan");
const { environment, model, cookieConfig, jwtConfig } = require('./config');
const { secret, expiresIn } = jwtConfig;

//prevent tinymce from allowing <script> tags to be inserted by malicious users
const sanitizer = require('express-html-sanitizer');
config = {
  allowedTags: ['u', 'b', 'i', 'em', 'strong', 'a', 'code', 'p', 'h1', 'h2', 'h3', 'h4', 'ul', 'li', 'ol'],
  allowedAttributes: { 'a': ['href'] }
}

const sanitizeReqBody = sanitizer(config);


const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, '/public')));

const bearerToken = require('express-bearer-token');
const { checkAuth } = require("./auth.js");



app.set('view engine', 'pug');

app.use(cookieParser(cookieConfig));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bearerToken({
  cookie: {
    signed: true,
    secret,
    key: "access_token",
  }
}));
app.use(sanitizeReqBody);

app.use('/search', searchRouter);
app.use("/users", usersRouter);
app.use("/questions", questionsRoute);
app.use("/answers", answersRouter);

app.get('/', checkAuth, (req, res) => {
  res.render('banner', { title: 'Core Dump - Welcome', signedIn: req.user })
})

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login Page' });
})

app.get('/signup', (req, res) => {
  res.render('signup', {title: 'Sign Up'});
})

app.get('/users', checkAuth, async (req, res) => {
  const users = await User.findAll();
  res.render('users', { users, signedIn: req.user, title: 'Users' });
})

app.get('/users/:id', checkAuth, async (req, res) => {
  
  const user = await User.findByPk(req.params.id);
  const userId = await req.params.id;
  const currentUserId = req.user.dataValues.id;
  const questions = await Question.findAll({
    where: {userId},
  });
  const answers = await Answer.findAll({
    where: {userId},
    include: [Question],
  });
  const answerVotes = await AnswerVote.findAll({
    where: {userId},
    
  });
  res.render('users/show', { user, signedIn: req.user, currentUserId, questions, answers, answerVotes });
});

app.get('/main', checkAuth, async (req, res) => {
  const topQuestions = await Question.findAll({ limit: 10, order: [['createdAt', 'DESC']] });
  // Loop through questions and find their author's userName
  for (let question of topQuestions) {
    const user = await User.findByPk(question.userId);
    question.author = user.userName;
    question.score = await countQuestionVotes(question.id);
  }
  res.render('main', { topQuestions, signedIn: req.user, title: 'Core Dump' })
})


app.get('/postQuestion', checkAuth, csrfProtection, (req, res) => {
  let csrfToken = req.csrfToken();
  res.render('add-question', { csrfToken, title: 'Ask a Question', signedIn: req.user })
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
