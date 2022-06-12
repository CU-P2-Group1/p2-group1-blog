// Import Required Packages & Files
const router = require("express").Router();
const sequelize = require("../../config/connection.js");
const withAuth = require("../../utils/auth");

// Import Required Models
const { User, Post, Comment, Category } = require("../../models");

// Get All Posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "content", "created_at", "vote_count"],
      order: [["created_at", "DESC"]],
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
          model: Category,
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get One Post
router.get("/:id", async (req, res) => {
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
          model: Category,
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

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create New Post
router.post("/", async (req, res) => {
  try {
    /* expects {
      title: 'Object-Relational Mapping', 
      content: 'I have really loved learning about ORMs.', 
      user_id: 1,
      category_id: 1,
    } */
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
      category_id: req.body.category_id,
      vote_count: 0,
    });

    if (req) res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Post
router.put("/:id", async (req, res) => {
  try {
    /* expects {
      title: 'Object-Relational Mapping', 
      content: 'I have really loved learning about ORMs.', 
      user_id: 1,
      category_id: 1,
    } */
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Vote Endpoint
router.put("/:id/vote", async (req, res) => {
  try {
    /* expects {
      vote_count: 1,
    } */
    const postData = await Post.update(
      { vote_count: req.body.vote_count },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Post
router.delete("/:id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
