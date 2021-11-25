const { User, Campaign, Character, Blog, Comment, UserCampaign, Invite, Inventory } = require("../../models");
const router = require('express').Router();
const tokenAuth = require("../../middleware/tokenAuth");

// The `http://localhost:3001/api/character` endpoint

//CREATE CHARACTER
router.post('/', tokenAuth, async (req, res) => {
  try {
    const characterData = await Character.create({
      name: req.body.name,
      user_id: req.user.id, 
      campaign_id: req.body.campaign.id, //not sure about this one
      race: req.body.race,
      class: req.body.class,
      picture: req.body.picture
    })
    res.status(200).json(characterData)
  } catch(err) {
      console.log(err);
      res.status(400).json({ message: "an error occured", err: err });
  };
});

//READ CHARACTERS
router.get('/', async (req, res) => {
  try {
    const characterData = await Character.findAll({
      include: [User, Campaign],
    });
    res.status(200).json(characterData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const characterData = await Character.findByPk(req.params.id, {
      include: [User, Campaign],
    });

    if (!characterData) {
      res.status(404).json({ message: 'No Character found with that id!' });
      return;
    }

    res.status(200).json(characterData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE CHARACTERS
router.put('/:id', tokenAuth, async (req, res) => {
  try {
    const characterData = await Character.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.user.id
      },
    });
    if (!characterData[0]) {
      res.status(404).json({ message: 'No Character with this id!' });
      return;
    }
    res.status(200).json(characterData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE CHARACTER
router.delete('/:id', tokenAuth, async (req, res) => {
  try {
    const characterData = await Character.destroy({
      where: {
        id: req.params.id,
        user_id: req.user.id
      },
    });
    if (!characterData) {
      res.status(404).json({ message: 'No Character with this id!' });
      return;
    }
    res.status(200).json(characterData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  




module.exports = router;