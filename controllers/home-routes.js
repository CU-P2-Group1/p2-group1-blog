// Import Required Packages & Files
const router = require("express").Router();
const sequelize = require("../config/connection.js");
const withAuth = require("../utils/auth");

// Import Required Models
const { User, Post, Comment, Category } = require("../models");

// Get All Posts for Homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const categoryData = await Category.findAll({
      attributes: ["id", "category_name"],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    const categories = categoryData.map((category) =>
      category.get({ plain: true })
    );

    res.render("homepage", {
      posts,
      categories,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Single Post
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      attributes: ["id", "title", "content", "created_at", "vote_count"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    const post = postData.get({ plain: true });
    res.render("single-post", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Post by Category
router.get("/category/:id", async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      include: [
        {
          model: Post,
          attributes: ["id", "title", "content", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
      where: {
        id: req.params.id,
      },
    });

    const categoriesData = await Category.findAll({
      attributes: ["id", "category_name"],
    });

    const oneCategory = categoryData.get({ plain: true });
    const categories = categoriesData.map((category) =>
      category.get({ plain: true })
    );

    res.render("category", {
      oneCategory,
      categories,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login Page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// Sign Up Page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// Password Page
router.get("/password", (req, res) => {
  res.render("password-reset");
});

module.exports = router;
