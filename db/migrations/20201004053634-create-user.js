'use strict';
User.prototype.validatePassword = function (password) {
  // Note that since this function is a model instance method,
  // `this` is the user instance here:
  return bcrypt.compareSync(password, this.hashedPassword.toString());
};

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
        defaultValue: "public/images/silhouete.jpg"
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
