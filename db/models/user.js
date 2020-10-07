'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany( models.Question, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
    User.hasMany (models.Vote, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
    User.hasMany (models.Answer, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true  });
  };
  return User;
};
