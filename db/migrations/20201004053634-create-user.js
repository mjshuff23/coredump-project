'use strict';
const faker = require("faker");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      bio: {
        type: Sequelize.TEXT
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING.BINARY
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue: faker.internet.avatar()
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
