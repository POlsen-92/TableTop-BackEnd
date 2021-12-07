const { Character, Feature } = require("../../models");
const tokenAuth = require("../../middleware/tokenAuth");
const router = require('express').Router();

// The `http://localhost:3001/api/feature` endpoint

// create  
router.post('/:id', tokenAuth, async (req, res) => {
    try {
      const featureData = await Feature.create({
        character_id: req.params.id,
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        user_id: req.user.id
      })
      res.status(200).json(featureData)
    } catch(err) {
        res.status(400).json({ message: "an error occured", err: err });
      };
  });

// find one 
router.get('/:id', async (req, res) => {
    try {
      const featureData = await Feature.findByPk(req.params.id, {
        include: [Character],
      });
      if (!featureData) {
        res.status(404).json({ message: 'No Feature found with that id!' });
        return;
      }
      res.status(200).json(featureData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// update 
router.put('/:id', tokenAuth, async (req, res) => {
    try {
      const featureData = await Feature.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.user.id
        },
      });
      if (!featureData) {
        res.status(404).json({ message: 'No Feature with this id!' });
        return;
      }
      res.status(200).json(featureData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// delete 
router.delete('/:id', tokenAuth, async (req, res) => {
    try {
      const featureData = await Feature.destroy({
        where: {
          id: req.params.id,
          user_id: req.user.id
        },
      });
      if (!featureData) {
        res.status(404).json({ message: 'No Feature with this id!' });
        return;
      }
      res.status(200).json(featureData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


module.exports = router;