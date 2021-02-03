"use strict";

const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          userName: "demo",
          email: "demo@aa.io",
          hashedPassword: "password",
          bio:
            "This is demo user. Lorem Ipsum, Zombie fan. Game freak specialist. Always go for a coffe. Pop KPop whatever.",
          createdAt: new Date(),
          updatedAt: new Date(),
          avatar: "/images/avataaars.png",
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          bio:
            "Beer fanatic. Zombie fan. Amateur tvaholic. Web advocate. Social media specialist. Coffee trailblazer. Pop culture junkie.",
          createdAt: new Date(),
          updatedAt: new Date(),
          avatar: "/images/avataaars.png",
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          bio:
            "Lifelong coffee fanatic. Proud writer. Food advocate. Twitter specialist. Alcohol expert. Music geek. Incurable tv fan.",
          createdAt: new Date(),
          updatedAt: new Date(),
          avatar: "/images/avataaars(1).png",
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          bio:
            "Music maven. Gamer. Lifelong food lover. Friendly twitter expert. Beer nerd. Hardcore writer. Thinker.",
          createdAt: new Date(),
          updatedAt: new Date(),
          avatar: "/images/avataaars(2).png",
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          bio:
            "Unapologetic twitter nerd. Subtly charming zombie advocate. Bacon enthusiast.",
          createdAt: new Date(),
          updatedAt: new Date(),
          avatar: "/images/avataaars(3).png",
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          bio:
            "Amateur creator. Devoted explorer. Unable to type with boxing gloves on. Pop culture aficionado.",
          createdAt: new Date(),
          updatedAt: new Date(),
          avatar: "/images/avataaars(4).png",
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          bio:
            "Travel maven. Friend of animals everywhere. Friendly tv scholar. Unapologetic web ninja. ",
          createdAt: new Date(),
          updatedAt: new Date(),
          avatar: "/images/avataaars(5).png",
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          bio: "Social media enthusiast. Pop culture nerd.",
          createdAt: new Date(),
          updatedAt: new Date(),
          avatar: "/images/avataaars(6).png",
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          bio:
            "Web junkie. Lifelong twitteraholic. Travel advocate. Passionate student. Music nerd.",
          createdAt: new Date(),
          updatedAt: new Date(),
          avatar: "/images/avataaars(7).png",
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          bio: "Entrepreneur. Hardcore programmer. Student.",
          createdAt: new Date(),
          updatedAt: new Date(),
          avatar: "/images/avataaars(8).png",
        },
        {
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          hashedPassword: bcrypt.hashSync(faker.internet.password()),
          bio: "Explorer. Problem solver. Amateur food aficionado.",
          createdAt: new Date(),
          updatedAt: new Date(),
          avatar: "/images/avataaars(9).png",
        },
      ],
      { returning: true }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
