const { Category } = require("../models");

const categorydata = [
  {
    category_name: "Technology",
  },
  {
    category_name: "News",
  },
  {
    category_name: "Sports",
  },
  {
    category_name: "Games",
  },
  {
    category_name: "Finance",
  },
  {
    category_name: "Entertainment",
  },
  {
    category_name: "Tech",
  },
  {
    category_name: "Other",
  },
];

const seedCategory = () => Category.bulkCreate(categorydata);

module.exports = seedCategory;
