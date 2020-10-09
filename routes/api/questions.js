const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors, asyncHandler } = require('../../utils');
const { Op } = require("sequelize");
const router = express.Router();
const db = require('../../db/models');


const { Question, Answer } = db;

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
