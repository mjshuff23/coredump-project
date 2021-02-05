'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");
module.exports = {
up: (queryInterface, Sequelize) => {
return queryInterface.bulkInsert('Answers', [
  {
    questionId: 1,
    answerText: "You could try this, git reset --hard. That usually works for me.",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 2,
  },
  {
    questionId: 1,
    answerText: "For the lightest touch, you can even undo your commit but leave your files with git reset --soft.",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 3,
  },
  {
    questionId: 1,
    answerText: "If you have already made your commits public, you will want to create a new commit which will revert the changes you made in your previous commit (current HEAD).",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 4,
  },
  {
    questionId: 1,
    answerText: "Amending a commit is the ideal solution if you need to change the last commit, but a more general solution is reset.",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 5,
},
{
  questionId: 1,
  answerText: "This command is responsible for the undo. It will undo your last commit while leaving your working tree (the state of your files on disk) untouched. You'll need to add them again before you can commit them again). Make corrections to working tree files. git add anything that you want to include in your new commit. Commit the changes, reusing the old commit message. reset copied the old head to .git/ORIG_HEAD; commit with -c ORIG_HEAD will open an editor, which initially contains the log message from the old commit and allows you to edit it. If you do not need to edit the message, you could use the -C option.",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 6,
},
{
  questionId: 2,
  answerText: "When you use pull, Git tries to automatically do your work for you. It is context sensitive, so Git will merge any pulled commits into the branch you are currently working in. pull automatically merges the commits without letting you review them first. If you don’t closely manage your branches, you may run into frequent conflicts. When you fetch, Git gathers any commits from the target branch that do not exist in your current branch and stores them in your local repository. However, it does not merge them with your current branch. This is particularly useful if you need to keep your repository up to date, but are working on something that might break if you update your files. To integrate the commits into your master branch, you use merge.",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 2,
},
{
  questionId: 2,
  answerText: "git fetch is the command that says bring my local copy of the remote repository up to date. git pull says bring the changes in the remote repository to where I keep my own code.",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 3,
},
{
  questionId: 2,
  answerText: "One use case of git fetch is that the following will tell you any changes in the remote branch since your last pull... so you can check before doing an actual pull, which could change files in your current branch and working copy.",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 4,
},
{
  questionId: 2,
  answerText: "If you do a git fetch it will just fetch all the changes in the remote repository (GitHub) and move the origin/master pointer to HEAD. Meanwhile your local branch master will keep pointing to where it has. If you do a git pull, it will do basically fetch (as explained previously) and merge any new changes to your master branch and move the pointer to HEAD.",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 5,
},
])
},

down: (queryInterface, Sequelize) => {
return queryInterface.bulkDelete('Answers', null, {});
}
};
