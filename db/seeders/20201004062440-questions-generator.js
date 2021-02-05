'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Questions",
      [
        {
          questionSubject: "How do I undo the most recent local commits in Git?",
          questionText: "I accidentally committed the wrong files to Git, but didn't push the commit to the server yet. How can I undo those commits from the local repository?",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          questionSubject: "What is the difference between 'git pull' and 'git fetch'?",
          questionText: "What are the differences between git pull and git fetch?",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          questionSubject: "How can I remove a specific item from an array?",
          questionText: "I have an array of numbers and I'm using the .push() method to add elements to it. Is there a simple way to remove a specific element from an array?",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },

        {
          questionSubject: "Why does HTML think 'chucknorris' is a color?",
          questionText: "Interestingly, while chucknorri produces a red background as well, chucknorr produces a yellow background. What’s going on here?",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
        {
          questionSubject: "What does 'use strict' do in JavaScript, and what is the reasoning behind it?",
          questionText: "Doing some searching, I realized that some people add 'use strict'; into their JavaScript code. Once I added the statement, the error stopped appearing. Unfortunately, Google did not reveal much of the history behind this string statement. Certainly it must have something to do with how the JavaScript is interpreted by the browser, but I have no idea what the effect would be.",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 5,
        },
        {
          questionSubject: "Does Python have a ternary conditional operator?",
          questionText: "If Python does not have a ternary conditional operator, is it possible to simulate one using other language constructs?",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 7,
        },
        {
          questionSubject: "Which equals operator (== vs ===) should be used in JavaScript comparisons?",
          questionText: "Is there a performance benefit to replacing == with ===? Any performance improvement would be welcomed as many comparison operators exist. If no type conversion takes place, would there be a performance gain over ==?",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
        },
        {
          questionSubject: "PUT vs. POST in REST",
          questionText: "So, which one should be used to create a resource? Or one needs to support both?",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Questions", null, {});
  }
};
