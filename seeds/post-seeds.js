const { Post } = require("../models");

const postData = [
  {
    title: "ORM",
    content: "This is my post on ORM",
    user_id: 4,
    category_id: 1,
    image_url: "https://softuni.org/wp-content/uploads/2021/12/orm-300x153.png",
    vote_count: 0,
  },
  {
    title: "Happy Birthday",
    content: "This is going to be a great year!",
    user_id: 2,
    category_id: 6,
    image_url:
      "https://www.rtpd.org/wp-content/uploads/2020/11/Birthday-parties-2-940x490.jpg",
    vote_count: 0,
  },
  {
    title: "Gymnastics",
    content: "Gymnastics is very challenging but a lot of fun!",
    user_id: 1,
    category_id: 1,
    image_url:
      "https://i.cbc.ca/1.6116441.1627208393!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/simone-biles-250721.jpg",
    vote_count: 0,
  },
  {
    title: "This is a test blog",
    content: "This is a test!",
    user_id: 3,
    category_id: 1,
    vote_count: 0,
  },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
