const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors, asyncHandler } = require('../../utils');
const { Op } = require("sequelize");
const router = express.Router();
const db = require('../../db/models');
const { checkAuth } = require("../../auth.js");


const { Question, Answer, AnswerVote, QuestionVote, User } = db;

const validateQuestion = [
  check("questionSubject")
    .isLength({ min: 5 })
    .withMessage("Question subject must have at least 5 characters."),
  check("questionSubject")
    .isLength({ max: 45 })
    .withMessage("Question subject must be no longer than 45 characters."),
  check("questionText")
    .isLength({ min: 30 })
    .withMessage("Question text must be at least 30 characters long."),
  handleValidationErrors,
];

async function registerAnswerVote(vote, userId, answerId) {
    let voted = await AnswerVote.findAll( {
        where: {
            userId,
            answerId
        }
    })
    if (!setVote(voted, vote)) {
        await AnswerVote.create( {
            vote,
            userId,
            answerId
        })
    }
};

async function registerQuestionVote(vote, userId, questionId) {
    let voted = await QuestionVote.findAll( {
        where: {
            userId,
            questionId
        }
    });

   if (!setVote(voted, vote)){
       await QuestionVote.create( {
           vote,
           userId,
           questionId,
       });
    }
}

async function countQuestionVotes(questionId) {
  const questionVotes = await QuestionVote.findAll({
    where: {
      questionId: {
        [Op.eq]: [questionId],
      }
    },
  });
  console.log('made it here')
  return countVotes(questionVotes);
}

async function countAnswerVotes(answerId) {
    const answerVotes = await AnswerVote.findAll({
      where: {
        answerId: {
          [Op.eq]: [answerId],
        }
      },
    });

    return countVotes(answerVotes);
}

function countVotes(votes) {
  let score = 0;
  // Find all the trues and all the falses related to this question
  for (let vote of votes) {
    if (vote.vote) {
      score++;
    } else {
      score--;
    }
  }
  return score;
}
function setVote(voted, vote) {
  //if we find a vote for this userId and AnswerId, let's see if we can change it.
   let retVal = true;
   if (voted) {
        //up vote (true) - cannot upvote
        if (vote) {
            //current vote is false; We can only set it if the current vote is true;
           voted.vote ? console.log("Cannot upvote an upvote") : voted.vote=vote;
        }
        else if(!vote) { //down vote (false)
            voted.vote ? voted.vote=vote : console.log("Cannot downvote a downvote");
        }
        return retVal;
    }
    return false;
}

router.post(
    '/new',
    validateQuestion,
    asyncHandler( async (req, res) => {
        const { questionSubject, questionText, userId } = req.body;
        const question = await Question.create({ questionSubject, questionText, userId });
        res.json({ question });
    })
);

router.post(
    '/upVoteQuestion',
    (req, res) => {
        console.log("Hit the post question route!");
    });

router.get('/', asyncHandler(async(req, res, next) => {
    // Get all questions
    const questions = await Question.findAll();

    res.render('questions', { questions });
  }));


  router.get('/:id', checkAuth, asyncHandler(async(req, res, next) => {
    const questionId = parseInt(req.params.id);
    // Find question based on id
    // Find question based on id
    const currentUserId = req.user.dataValues.id;
    const question = await Question.findByPk(questionId);
    // Grab username by question.userId
    const user = await User.findByPk(question.userId);
    question.author = user.userName;
    // Find votes associated with question
    let score = await countQuestionVotes(questionId);

    // Find associated answers based on id
    const answers = await Answer.findAll({
      where: {
        questionId: {
          [Op.eq]: [questionId],
        }
      },
    });
    // Find scores associated with each answer
    for (let answer of answers) {
      let score = await countAnswerVotes(answer.id);
      const user = await User.findByPk(answer.userId);
      answer.score = score;
      answer.author = user.userName;
    }
    res.render('question', { question, answers, score, currentUserId });
  }));

router.post(
  '/new',
  validateQuestion,
  asyncHandler(async (req, res) => {
    const { questionSubject, questionText, userId } = req.body;
    const question = await Question.create({ questionSubject, questionText, userId });
    res.json({ question });
  })
);

router.get('/', asyncHandler(async (req, res, next) => {
  // Get all questions
  const questions = await Question.findAll();

  res.render('questions', { questions, title: 'Questions' });
}));


router.get('/:id', asyncHandler(async (req, res, next) => {
  const questionId = parseInt(req.params.id);
  // Find question based on id
  const question = await Question.findByPk(questionId);
  // Find associated answers based on id
  console.log(questionId);
  const answers = await Answer.findAll({
    where: {
      questionId: {
        [Op.eq]: [questionId],
      }
    },
  });
  res.render('question', { question, answers, title: question.questionSubject });
}));

router.get('/:id/delete', checkAuth, asyncHandler(async(req, res, next) => {
  // Grab question to delete by id
  const questionId = parseInt(req.params.id);
  const question = await Question.findByPk(questionId);
  const currentUserId = req.user.dataValues.id;

  if (!currentUserId || question.userId !== currentUserId) {
    res.status(403).send(`Can't Delete questions that are not yours, cheater`);
    return;
  }

  await question.destroy();
  const topQuestions = await Question.findAll({ limit: 10, order: [['createdAt', 'DESC']] });
  res.render('main', { topQuestions, signedIn: req.user, title: 'Core Dump' });
}));

router.get('/:questionId/answers/:answerId/delete', checkAuth, asyncHandler(async(req, res, next) => {
  const answerId = parseInt(req.params.answerId);
  const currentUserId = req.user.dataValues.id;
  const answer = await Answer.findByPk(answerId);

  if (!currentUserId || answer.userId !== currentUserId) {
    res.status(403).send(`Can't Delete answers that are not yours, cheater`);
    return;
  }

  await answer.destroy();
  const topQuestions = await Question.findAll({ limit: 10, order: [['createdAt', 'DESC']] });
  res.render('main', { topQuestions, signedIn: req.user, title: 'Core Dump' });
}));

module.exports = router;
