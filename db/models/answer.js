'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answerText: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
    Answer.hasMany( models.Vote, { foreignKey: 'answerId', onDelete: 'CASCADE', hooks: true });
    Answer.belongsTo( models.User, { foreignKey: 'userId' });
    Answer.belongsTo( models.Question, { foreignKey: 'questionId' });
  };
  return Answer;
};
