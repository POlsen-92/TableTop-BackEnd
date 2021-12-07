const { Character, Proficiency } = require("../../models");
const tokenAuth = require("../../middleware/tokenAuth");
const router = require('express').Router();

// The `http://localhost:3001/api/proficiency` endpoint

// create  
router.post('/:id', tokenAuth, async (req, res) => {
    try {
      const proficiencyData = await Proficiency.create({
        character_id: req.params.id,
        name: req.body.name,
        type: req.body.type,
        subType: req.body.subType,
        ability: req.body.ability,
        script: req.body.script,
        typicalSpeakers: req.body.typicalSpeakers,
        user_id: req.user.id,
        description: req.body.description
      })
      res.status(200).json(proficiencyData)
    } catch(err) {
        res.status(400).json({ message: "an error occured", err: err });
      };
  });

// find one 
router.get('/:id', async (req, res) => {
    try {
      const proficiencyData = await Proficiency.findByPk(req.params.id, {
        include: [Character],
      });
      if (!proficiencyData) {
        res.status(404).json({ message: 'No Proficiency found with that id!' });
        return;
      }
      res.status(200).json(proficiencyData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// update 
router.put('/:id', tokenAuth, async (req, res) => {
    try {
      const proficiencyData = await Proficiency.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.user.id
        },
      });
      if (!proficiencyData) {
        res.status(404).json({ message: 'No Proficiency with this id!' });
        return;
      }
      res.status(200).json(proficiencyData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// delete 
router.delete('/:id', tokenAuth, async (req, res) => {
    try {
      const proficiencyData = await Proficiency.destroy({
        where: {
          id: req.params.id,
          user_id: req.user.id
        },
      });
      if (!proficiencyData) {
        res.status(404).json({ message: 'No Proficiency with this id!' });
        return;
      }
      res.status(200).json(proficiencyData);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;