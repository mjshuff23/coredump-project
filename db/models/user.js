'use strict';
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {type: DataTypes.STRING, allowNull: false, unique: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    bio: DataTypes.STRING,
    hashedPassword: {type: DataTypes.STRING.BINARY, allowNull: false},
    avatar: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany( models.Question, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
    User.hasMany (models.QuestionVote, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
    User.hasMany (models.Answer, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true  });
    User.hasMany (models.AnswerVote, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })
  };

  User.prototype.validatePassword = function (password) {
    // because this is a model instance method, `this` is the user instance here:
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  return User;
};
