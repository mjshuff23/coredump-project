'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");
module.exports = {
up: (queryInterface, Sequelize) => {
return queryInterface.bulkInsert('Answers', [
  {
    questionId: 1,
    answerText: faker.company.catchPhrase(),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 2,
  },
  {
    questionId: 1,
    answerText: faker.company.catchPhrase(),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 3,
  },
  {
    questionId: 1,
    answerText: faker.company.catchPhrase(),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 4,
  },
  {
    questionId: 1,
    answerText: faker.company.catchPhrase(),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 5,
},
{
  questionId: 1,
  answerText: faker.company.catchPhrase(),
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 6,
},
{
  questionId: 2,
  answerText: faker.company.catchPhrase(),
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 2,
},
{
  questionId: 2,
  answerText: faker.company.catchPhrase(),
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 3,
},
{
  questionId: 2,
  answerText: faker.company.catchPhrase(),
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 4,
},
{
  questionId: 2,
  answerText: faker.company.catchPhrase(),
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 5,
},
])
},

down: (queryInterface, Sequelize) => {
return queryInterface.bulkDelete('Answers', null, {});
}
};
