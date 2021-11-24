const router = require('express').Router();
const { Blog, User, Comment, Campaign, Character } = require('../../models');
const tokenAuth = require("../../middleware/tokenAuth");

// The `http://localhost:3001/api/campaign` endpoint

//CREATE CAMPAIGN
router.post('/', tokenAuth,  async (req, res) => {
  try {
    const campaignData = await Campaign.create({
      name: req.body.name,
      gm_id: req.user.id, 
      description: req.body.description,
      picture: ""
    })
    res.status(200).json(campaignData)
  } catch(err) {
      console.log(err);
      res.status(400).json({ message: "an error occured", err: err });
    };
});

// GET ALL CAMPAIGNS
router.get('/all', async (req, res) => {
  try {
    const campaignData = await Campaign.findAll({
      include: [User, Character],
    });
    res.status(200).json(campaignData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL CAMPAIGNS FROM ONE GM
router.get('/gm', tokenAuth, async (req, res) => {
  try {
    const campaignData = await Campaign.findAll({
      where: {
        gm_id: req.user.id
      },
      include: [User, Character],
    });
    res.status(200).json(campaignData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL CAMPAIGNS FROM ONE USER 
// TODO: Not so sure about how to do this one
// router.get('/user/:id', async (req, res) => {
//   try {
//     const campaignData = await Campaign.findAll({
//       where: {
//         user_id: req.params.id
//       },
//       include: [User, Character],
//     });
//     res.status(200).json(campaignData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// FIND ONE CAMPAIGN
router.get('/:id', async (req, res) => {
  try {
    const campaignData = await Campaign.findByPk(req.params.id, {
      include: [User, Character],
    });

    if (!campaignData) {
      res.status(404).json({ message: 'No Campaign found with that id!' });
      return;
    }

    res.status(200).json(campaignData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE CAMPAIGN 
router.put('/:id', async (req, res) => {
  try {
    const campaignData = await Campaign.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!campaignData[0]) {
      res.status(404).json({ message: 'No Character with this id!' });
      return;
    }
    res.status(200).json(campaignData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE CAMPAIGN 
router.delete('/:id', tokenAuth, async (req, res) => {
  try {
    const campaignData = await Campaign.destroy({
      where: {
        id: req.params.id,
        gm_id: req.user.id 
      },
    });
    if (!campaignData) {
      res.status(404).json({ message: 'No Character with this id!' });
      return;
    }
    res.status(200).json(campaignData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  


module.exports = router;
