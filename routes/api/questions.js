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
    .isLength({ min: 3 })
    .withMessage("Question subject must have at least 3 characters."),
  check("questionSubject")
    .isLength({ max: 45 })
    .withMessage("Question subject must be no longer than 45 characters."),
  check("questionText")
    .isLength({ min: 3 })
    .withMessage("Question text must be at least 3 characters long."),
  handleValidationErrors,
];

async function countQuestionVotes(questionId) {
  const questionVotes = await QuestionVote.findAll({
    where: {
      questionId: {
        [Op.eq]: [questionId],
      }
    },
  });
  let votes = countVotes(questionVotes);
  // console.log("Votes from countQuestionVotes:  ", votes);
  return votes;
}

async function countAnswerVotes(answerId) {
  const answerVotes = await AnswerVote.findAll({
    where: {
      answerId: {
        [Op.eq]: [answerId],
      }
    },
  });
  let votes = countVotes(answerVotes);
  // console.log("Votes from countAnswerVotes: ", votes);

  return votes;
}

function countVotes(votes) {
  let score = 0;
  // Find all the trues and all the falses related to this question
  // console.log(`Received ${votes.length} votes.`);
  for (let i = 0; i < votes.length; i++) {
    // console.log(`VoteId:  ${votes[i].id}, QuestionId: ${votes[i].questionId}, UserId: ${votes[i].userId}, Vote: ${votes[i].vote}`);
  }
  for (let thisVote of votes) {
    if (thisVote.vote) {
      // console.log("thisVote.vote:  ", thisVote.vote, " adding 1.");
      score += 1;
    } else {
      // console.log("this.Vote.vote:  ", thisVote.vote, " subtracting 1 from the score");
      score -= 1;
    }
  }
  // console.log("Returning count of votes:  ", score);
  return score;
}

async function setVote(dbVoteObj, currentVote, res) {
  // console.log("*********************************************");
  // console.log("dbVoteObj.vote:  ", dbVoteObj.vote, " and currentVote:  ", currentVote, "and  currentVote === true:  ", (currentVote));
  //new vote is an upVote
  // console.log("Result of currentVote === true:  ", (currentVote === true));
  if (currentVote) {
    // console.log("Vote is true ...", currentVote);
    //current vote is an upVote
    if (dbVoteObj.vote) {
      // console.log("dbVoteObj.vote is true ... throwing error ");
      return ("You have already upvoted this.");

    } else {
      // console.log("dbVoteObj.vote is false ... setting vote to downvote");
      //current vote is downVote;
      //new vote is an upVote; change to upvote;
      await dbVoteObj.destroy();
      // await dbVoteObj.save();
    }
  } else {
    // console.log("vote is false ...");
    //new vote is a downvote (false)
    if (dbVoteObj.vote) {
      //current vote is an upvote;
      //change current vote to a downvote
      // console.log("dbVoteObj.vote is true ... setting vote to downvote");
      await dbVoteObj.destroy();
      // dbVoteObj.vote=currentVote;
      // await dbVoteObj.save();
    } else {
      //database vote is a downVote
      //new vote is a downVote
      // console.log("dbVoteObj.vote is false ... throwing error - cannot downvote downvote");
      return "You have already downvoted this.";
    }
  }
  return "";
}

router.post('/new', validateQuestion, asyncHandler(async (req, res) => {
  const { questionSubject, questionText, userId } = req.body;
  const question = await Question.create({ questionSubject, questionText, userId });
  res.json({ question });
}
));

router.post('/countQuestions', asyncHandler(async (req, res, next) => {
  const { questionId } = req.body;
  let votes = await countQuestionVotes(questionId);
  // console.log(`Counted ${votes} for questionId: ${questionId}`);
  res.json({ votes });


}));

router.post('/voteQuestion', asyncHandler(async (req, res, next) => {

  let { vote, userId, questionId } = req.body;
  vote === 'true' ? vote = true : vote = false;
  // console.log("**********************************************************");
  // console.log("Voting on Question for userId: ", userId, " and QuestionId: ", questionId, " and vote:  ", vote);
  let errText = "";
  const voted = await QuestionVote.findAll({
    where: {
      userId,
      questionId
    }
  });
  if (voted.length > 1) {
    errText = `Something is wrong with db tables - there is more than one vote for this userId: ${userId} and questionId: ${questionId}.`;
  } else {
    if (voted[0] === undefined) {
      await QuestionVote.create({
        vote,
        userId,
        questionId,
      });
    } else {
      errText = await setVote(voted[0], vote, res);
    }
  }
  if (errText) {
    res.status(400).json({ error: errText });
  } else {
    const newVoteCount = await countQuestionVotes(questionId);
    res.send({ voteCount: newVoteCount });
  }
}
));

router.post('/voteAnswer', asyncHandler(async (req, res, next) => {
  let { vote, userId, answerId } = req.body;
  vote === 'true' ? vote = true : vote = false;
  let errText = "";
  const voted = await AnswerVote.findAll({
    where: {
      userId,
      answerId
    }
  });
  if (voted.length > 1) {
    errText = `Something is wrong with db tables - there is more than one vote for this userId: ${userId} and questionId: ${questionId}.`;
  } else {
    if (voted[0] === undefined) {
      await AnswerVote.create({
        vote,
        userId,
        answerId,
      });
    } else {
      errText = await setVote(voted[0], vote, res);
    }
  }
  if (errText) {
    res.status(400).json({ error: errText });
  } else {
    const newVoteCount = await countAnswerVotes(answerId);
    res.send({ voteCount: newVoteCount });
  }
}));


router.get('/', asyncHandler(async (req, res, next) => {
  // Get all questions
  const questions = await Question.findAll();
  // Get votes associated with each question

  res.render('questions', { questions });
}));

// router.get('/users/:id', checkAuth, async (req, res) => {
//   const user = await User.findByPk(req.params.id);
  
//   const questions = await Question.findAll({
//     where: {
//       userId: {
//         [Op.eq]: [user],
//       }
//     },
//   });
//   res.render('users/show', { user, questions });
// });

router.get('/:id', checkAuth, asyncHandler(async (req, res, next) => {
  const questionId = parseInt(req.params.id);
  // Find question based on id
  let currentUserId = 0;
  if (req.user) {
    currentUserId = req.user.dataValues.id;
  }
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
  res.render('question', { signedIn: req.user, question, answers, score, currentUserId });
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
  // console.log(questionId);
  const answers = await Answer.findAll({
    where: {
      questionId: {
        [Op.eq]: [questionId],
      }
    },
  });
  res.render('question', { question, answers, title: question.questionSubject });
}));

router.get('/:id/delete', checkAuth, asyncHandler(async (req, res, next) => {
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

router.get('/:questionId/answers/:answerId/delete', checkAuth, asyncHandler(async (req, res, next) => {
  const questionId = parseInt(req.params.questionId);
  const answerId = parseInt(req.params.answerId);
  const currentUserId = req.user.dataValues.id;
  const answer = await Answer.findByPk(answerId);

  if (!currentUserId || answer.userId !== currentUserId) {
    res.status(403).send(`Can't Delete answers that are not yours, cheater`);
    return;
  }

  await answer.destroy();
  // const topQuestions = await Question.findAll({ limit: 10, order: [['createdAt', 'DESC']] });
  // res.render('main', { topQuestions, signedIn: req.user, title: 'Core Dump' });
  const question = await Question.findByPk(questionId);
  // Find associated answers based on id
  // console.log(questionId);
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
  const user = await User.findByPk(question.userId);
  question.author = user.userName;
  let score = await countQuestionVotes(questionId);
  // res.redirect(`./questions/${questionId}`);

  res.render('question', { question, answers, score, title: question.questionSubject });
}));

module.exports = {
  questionsRoute: router,
  countQuestionVotes,
  countVotes
};
