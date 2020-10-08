'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    vote: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {});
  Vote.associate = function(models) {
    // associations can be defined here
    Vote.belongsTo( models.User, { foreignKey: 'userId' });
    Vote.belongsTo( models.Question, { foreignKey: 'answerId' });
  };
  return Vote;
};
