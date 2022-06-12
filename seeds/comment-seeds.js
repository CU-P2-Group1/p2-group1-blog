const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "This article is awesome!",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "This is really cool!",
    user_id: 2,
    post_id: 1,
  },
  {
    comment_text: "Very interesting!",
    user_id: 3,
    post_id: 2,
  },
  {
    comment_text: "This post is well written!",
    user_id: 3,
    post_id: 3,
  },
  {
    comment_text: "Great job!",
    user_id: 2,
    post_id: 4,
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
