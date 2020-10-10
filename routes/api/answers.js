const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors, asyncHandler } = require('../../utils');
const { Op } = require("sequelize");
const router = express.Router();
const db = require('../../db/models');

const { Question, Answer, AnswerVote, QuestionVote } = db;

const validateAnswer = [
  check("answerText")
    .isLength({ min: 30 })
    .withMessage("Answer text must be at least 30 characters long."),
  handleValidationErrors,
];

router.post(
    '/new',
    validateAnswer,
    asyncHandler( async (req, res) => {
        const { answerText, userId, questionId } = req.body;
        console.log(answerText);
        const answer = await Answer.create({ answerText, userId, questionId });
        res.json({ answer });
    })
);

router.get('/', asyncHandler(async (req, res, next) => {
    // Get all questions
    const answers = await Answer.findAll();
  
    res.render('answers', { answers, title: 'Answers' });
  }));

module.exports = router;