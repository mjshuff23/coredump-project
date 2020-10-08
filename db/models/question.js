'use strict';
const moment = require('moment');
<<<<<<< HEAD
=======

>>>>>>> main
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    questionSubject: DataTypes.TEXT,
    questionText: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
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
  Question.associate = function (models) {
    // associations can be defined here
    Question.belongsTo(models.User, { foreignKey: 'userId' });
    Question.hasMany(models.Answer, { foreignKey: 'questionId' });
  };
  return Question;
};
