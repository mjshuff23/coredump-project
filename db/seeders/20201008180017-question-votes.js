'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('QuestionVotes', [
    { vote: true,
      questionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 3, },
    { vote: false,
      questionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 3, },
    { vote: true,
      questionId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 4, },
    { vote: false,
      questionId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 1, },
    { vote: false,
      questionId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 3, },
    { vote: false,
      questionId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 4, },
    { vote: true,
      questionId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 5, },
    { vote: true,
      questionId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 1, },
    { vote: true,
      questionId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 2, },
    { vote: false,
      questionId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 3, },
    { vote: true,
      questionId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 1, },
    { vote: false,
      questionId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 1, },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('QuestionVotes', null, {} );
  }
};
