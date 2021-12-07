const { User, Blog, Comment } = require("../../models");
const tokenAuth = require("../../middleware/tokenAuth");
const router = require('express').Router();

// The `http://localhost:3001/api/comment` endpoint

// create a new Comment 
router.post('/:id', tokenAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      user_id: req.user.id,
      blog_id: req.params.id,
      body: req.body.description
    })
    res.status(200).json(commentData)
  } catch(err) {
      res.status(400).json({ message: "an error occured", err: err });
    };
});

// find all Comments. be sure to include its associated Users and Blogs
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [User, Blog],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one Comment by its `id` value. be sure to include its associated Users and Blogs
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [User, Blog],
    });
    if (!commentData) {
      res.status(404).json({ message: 'No Comment found with that id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a Comment by its `id` value 
router.put('/:id', tokenAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.user.id
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'No Comment with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a Comment by its `id` value 
router.delete('/:id', tokenAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.user.id
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'No Comment with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;