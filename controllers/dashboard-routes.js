// Import Required Packages & Files
const router = require("express").Router();
const withAuth = require("../utils/auth");

// Import Required Models
const { User, Post, Category } = require("../models");

// Get All Posts for Dashboard
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      where: {
        user_id: req.session.user_id,
      },
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit Post
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      attributes: [
        "id",
        "title",
        "content",
        "category_id",
        "image_url",
        "created_at",
      ],
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    const categoryData = await Category.findAll({
      attributes: ["id", "category_name"],
    });

    const post = postData.get({ plain: true });
    const categories = categoryData.map((category) =>
      category.get({ plain: true })
    );

    res.render("edit-post", {
      post,
      categories,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create New Post
router.get("/new", withAuth, async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      attributes: ["id", "category_name"],
    });

    const categories = categoryData.map((category) =>
      category.get({ plain: true })
    );

    res.render("new-post", {
      categories,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update Profile
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.session.user_id,
      },
    });

    console.log(userData);

    if (!userData) {
      res.statusMessage = "No user found with this id";
      res.status(404).json({ message: "No user found with this id" });
      return;
    }

    const user = userData.get({ plain: true });

    res.render("profile", {
      user,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
