const { User } = require("../models");

const userData = [
  {
    username: "michelle_smith",
    password: "Welcome123!",
  },
  {
    username: "panda_express",
    password: "Welcome123!",
  },
  {
    username: "victorious_123",
    password: "Welcome123!",
  },
  {
    username: "sonic",
    password: "Welcome123!",
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
