# Core Dump

Core dump is a site for developers to get all the answers for their questions! It is a community-driven site driven by the power of peer review. User's can search questions, ask new questions, provide answers to other's questions, and rank other user's questions and answers!

[https://aa-coredump.herokuapp.com/](https://aa-coredump.herokuapp.com/)

## Technologies Used

- JSON Web Token for Authentication and Authorization
- Sequelize for Model/Migration/Seeding into PostgreSQL
- AJAX calls to the back-end
- PUG templates
- ExpressJS for all our server needs
- CSS for styling

### Features found in documentation folder

### Challenges Faced

- Navigating through each other's work without stepping on toes
  - Working together in one branch
- Making everything modular and reusable
  - Refactoring after completion

### Code Snippets

```
router.get('/', asyncHandler(async(req, res, next) => {
    // Get all questions
    const questions = await Question.findAll();
    // Get votes associated with each question

    res.render('questions', { questions });
  }));


  router.get('/:id', checkAuth, asyncHandler(async(req, res, next) => {
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

```
