const { User, Campaign, Character, Blog, Comment, UserCampaign, Invite, Inventory, Feature, Proficiency, Spell } = require("../../models");
const tokenAuth = require("../../middleware/tokenAuth");
const router = require('express').Router();

// The `http://localhost:3001/api/spell` endpoint

// create  
router.post('/:id', tokenAuth, async (req, res) => {
    try {
      const spellData = await Spell.create({
        user_id: req.user.id,
        blog_id: req.params.id,
        body: req.body.description
      })
      res.status(200).json(spellData)
    } catch(err) {
        res.status(400).json({ message: "an error occured", err: err });
      };
  });

// find one 
router.get('/:id', async (req, res) => {
    try {
      const spellData = await Spell.findByPk(req.params.id, {
        include: [User, Character],
      });
      if (!spellData) {
        res.status(404).json({ message: 'No Spell found with that id!' });
        return;
      }
      res.status(200).json(spellData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// update 
router.put('/:id', tokenAuth, async (req, res) => {
    try {
      const spellData = await Spell.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.user.id
        },
      });
      if (!spellData) {
        res.status(404).json({ message: 'No Spell with this id!' });
        return;
      }
      res.status(200).json(spellData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// delete 
router.delete('/:id', tokenAuth, async (req, res) => {
    try {
      const spellData = await Spell.destroy({
        where: {
          id: req.params.id,
          user_id: req.user.id
        },
      });
      if (!spellData) {
        res.status(404).json({ message: 'No Spell with this id!' });
        return;
      }
      res.status(200).json(spellData);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;