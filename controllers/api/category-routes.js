// Import Required Packages & Files
const router = require("express").Router();
const withAuth = require("../../utils/auth");

// Import Required Models
const { Category, User, Post } = require("../../models");

// Get All Categories and Related Posts
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
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
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get One Category
router.get("/:id", async (req, res) => {
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

    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create New Category
router.post("/", withAuth, async (req, res) => {
  try {
    // expects {category_name: 'Finance'}
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update Category Name
router.put("/:id", async (req, res) => {
  try {
    // expects {category_name: 'Finance'}
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Category
router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
