const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors, asyncHandler } = require('../../utils');
const { Op } = require("sequelize");
const router = express.Router();
const db = require('../../db/models');


const { Question, Answer, AnswerVote, QuestionVote } = db;

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
    votes = QuestionVote.findAll( {
        where: questionId
    });

    return countVotes(votes);
}

async function countAnswerVotes(answerId) {
    votes = AnswerVote.findAll( {
        where: answerId
    });

    return countVotes(votes);
}

function countVotes(votes) {
    let upVote = 0;
    let downVote = 0;

    for (let i=0; i < votes.length; i++) {
        if (votes[i].vote) {
            upVote++;
        } else {
            downVote++;
        }
    }

    return upVote - downVote;
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


  router.get('/:id', asyncHandler(async(req, res, next) => {
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
    console.log(answers.length);
    res.render('question', { question, answers });
  }));

module.exports = router;

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
  console.log(answers.length);
  res.render('question', { question, answers, title: question.questionSubject });
}));

module.exports = router;
