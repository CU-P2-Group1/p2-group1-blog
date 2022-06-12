const sequelize = require("../config/connection");
const seedCategory = require("./categoryData");
const seedComment = require("./comment-seeds");
const seedPost = require("./post-seeds");
const seedUser = require("./user-seeds");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();
  await seedCategory();
  await seedPost();
  await seedComment();

  process.exit(0);
};

seedAll();
