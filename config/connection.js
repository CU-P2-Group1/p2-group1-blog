// Import Required Packages
const Sequelize = require("sequelize");

require("dotenv").config();

// Create Connection to DB
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize('nookblog_db','root', '$hackettBrett2', {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    });

module.exports = sequelize;
