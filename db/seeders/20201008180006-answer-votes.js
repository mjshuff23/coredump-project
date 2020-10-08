'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AnswerVotes', [
    { vote: true,
        answerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1, },
      { vote: true,
        answerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2, },
      { vote: true,
        answerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3, },
      { vote: true,
        answerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1, },
      { vote: true,
        answerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2, },
      { vote: true,
        answerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3, },
      { vote: true,
        answerId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1, },
      { vote: true,
        answerId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1, },
      { vote: true,
        answerId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1, },
      { vote: true,
        answerId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1, }
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('AnswerVotes', null, {} );
  }
};
