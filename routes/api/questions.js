const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors, asyncHandler } = require('../../utils');
const router = express.Router();
const db = require('../../db/models');


const { Question } = db;

const validateQuestion = [
    check("questionSubject")
        .isLength( { min: 5 } )
        .withMessage("Question subject must have at least 5 characters."),
    check("questionSubject")
        .isLength( { max: 45 } )
        .withMessage("Question subject must be no longer than 45 characters."),
    check("questionText")
        .isLength( { min: 30 } )
        .withMessage("Question text must be at least 30 characters long."),
    handleValidationErrors,
];

router.post(
    '/new',
    validateQuestion,
    asyncHandler( async (req, res) => {
        const { questionSubject, questionText, userId } = req.body;
        const question = await Question.create({ questionSubject, questionText, userId });
        res.json({ question });
    })
);

module.exports = router;
