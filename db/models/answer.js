'use strict';
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answerText: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      //note here this is the guy that you are looking for
      get() {
        return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss');
      }
    }
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
    Answer.hasMany( models.AnswerVote, { foreignKey: 'answerId', onDelete: 'CASCADE', hooks: true });
    Answer.belongsTo( models.User, { foreignKey: 'userId' });
    Answer.belongsTo( models.Question, { foreignKey: 'questionId' });
  };
  return Answer;
};
