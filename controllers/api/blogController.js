const { User, Blog, Comment } = require("../../models");
const router = require('express').Router();
const tokenAuth = require("../../middleware/tokenAuth");

// The `http://localhost:3001/api/blog` endpoint


// CREATE A BLOG BY TOKEN AUTH
router.post('/', tokenAuth, async (req, res) => {
  try {
    const blogData = await Blog.create({
      user_id: req.user.id,
      title: req.body.title,
      description: req.body.description
    })
    res.status(200).json(blogData)
  } catch(err) {
    res.status(400).json({ message: "an error occured", err: err });
  };
});

// FIND ALL BLOGS. be sure to include its associated User and Comments
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [User, Comment],
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// FIND ONE BLOG by its `id` value. be sure to include its associated User and Comments
router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [User],
    });
    const commentData = await Comment.findAll({
      where: {
        blog_id: req.params.id
      }, 
      include: [ User ],
    });
    if (!blogData) {
      res.status(404).json({ message: 'No Blog found with that id!' });
      return;
    }
    res.status(200).json([blogData, commentData]);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE BLOG BY ID VALUE
router.put('/:id', tokenAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.user.id
      },
    });
    if (!blogData) {
      res.status(404).json({ message: 'No Blog with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE BLOG by its `id` value 
router.delete('/:id', tokenAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.user.id
      },
    });
    if (!blogData) {
      res.status(404).json({ message: `You can't delete this!` });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;