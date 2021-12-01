const { User, Campaign, Character, Blog, Comment, UserCampaign, Invite, Inventory, Feature, Proficiency, Spell } = require("../../models");
const router = require('express').Router();
const tokenAuth = require("../../middleware/tokenAuth");

// The `http://localhost:3001/api/character` endpoint

//CREATE CHARACTER
router.post('/camp:id', tokenAuth, async (req, res) => {
  try {
    const characterData = await Character.create({
      user_id: req.user.id,
      campaign_id: req.params.id,
      charName: req.body.charName,
      personality: req.body.personality,
      age: req.body.age,
      race: req.body.race,
      subRace: req.body.subrace,
      alignment: req.body.alignment,
      background: req.body.background,
      class: req.body.class,
      subClass: req.body.subclass,
      level: req.body.level,
      image_content: req.body.picture,
      strength: req.body.strength,
      dexterity: req.body.dexterity,
      constitution: req.body.constitution,
      intelligence: req.body.intelligence,
      wisdom: req.body.wisdom,
      charisma: req.body.charisma,
      speed: req.body.speed,
      hitpoints: req.body.hitpoints
    })
    res.status(200).json(characterData)
  } catch(err) {
      console.log(err);
      res.status(400).json({ message: "an error occured", err: err });
  };
});

// GET ALL CHARACTERS
router.get('/', async (req, res) => {
  try {
    const characterData = await Character.findAll({
      include: [User, Campaign, Inventory, Feature, Proficiency, Spell ],
    });
    if (!characterData) {
      res.status(404).json({ message: 'No Characters Found!' });
      return;
    }
    res.status(200).json(characterData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET A CHARACTER BY ID
router.get('/id:id', async (req, res) => {
  try {
    const characterData = await Character.findByPk(req.params.id, {
      include: [User, Campaign, Inventory, Feature, Proficiency, Spell],
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

// GET ALL CHARACTERS BY ONE USER
router.get('/user:id', async (req, res) => {
  try {
    const characterData = await Character.findAll({
      where: {
        user_id: req.params.id
      },
      include: [User, Campaign, Inventory, Feature, Proficiency, Spell],
    });
    if (!characterData) {
      res.status(404).json({ message: 'No Character found with that User!' });
      return;
    }

    res.status(200).json(characterData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL CHARACTERS IN ONE CAMPAIGN
router.get('/camp:id', async (req, res) => {
  try {
    const characterData = await Character.findAll({
      where: {
        campaign_id: req.params.id
      },
      include: [User, Campaign, Inventory, Feature, Proficiency, Spell],
    });
    if (!characterData) {
      res.status(404).json({ message: 'No Character found with that User!' });
      return;
    }

    res.status(200).json(characterData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE CHARACTERS
router.put('/update:id', tokenAuth, async (req, res) => {
  try {
    const characterData = await Character.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.user.id
      },
    });
    if (!characterData[0]) {
      res.status(404).json({ message: `Can't Update Character!` });
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
      res.status(404).json({ message: `Can't Delete Character` });
      return;
    }
    res.status(200).json(characterData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  

module.exports = router;