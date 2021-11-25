const { User, Campaign, Character, Blog, Comment, UserCampaign, Invite, Inventory } = require("../../models");
const router = require('express').Router();
const tokenAuth = require("../../middleware/tokenAuth");

// The `http://localhost:3001/api/blog` endpoint

// create a new Blog  

// find all Blogs. be sure to include its associated User and Comments
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [User, Comment],
    });
    console.log("abnannananannana")
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one Blog by its `id` value. be sure to include its associated User and Comments
router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [User, Comment],
    });
    
    if (!blogData) {
      res.status(404).json({ message: 'No Blog found with that id!' });
      return;
    }
    
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a Blog by its `id` value 
router.put('/:id', tokenAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.user.id
      },
    });
    if (!blogData[0]) {
      res.status(404).json({ message: 'No Blog with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a Blog by its `id` value 
router.delete('/:id', tokenAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id
        // user_id: req.user.id
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

router.post('/:id', async (req, res) => {
  try {
    const blogData = await Blog.create({
      title: req.body.title,
      description: req.body.description,
      UserId: req.params.id
    })
    res.status(200).json(blogData)
  } catch(err) {
    console.log(err);
    res.status(400).json({ message: "an error occured", err: err });
  };
});

module.exports = router;