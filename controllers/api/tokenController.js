const { Token, User, Campaign, Character, Blog, Comment, UserCampaign, Invite, Inventory, Feature, Proficiency, Spell } = require("../../models");const router = require('express').Router();
const tokenAuth = require("../../middleware/tokenAuth");

// The `http://localhost:3001/api/token` endpoint


// CREATE TOKEN BY CAMPAIGN ID 

router.post('/camp:id',  async (req, res) => {
    try {
      const tokenData = await Token.create({
        id:req.body.id,
        name: req.body.name,
        token_id: req.body.token_id,
        x: req.body.x,
        y: req.body.y,
        campaign_id: req.params.id,
        
      })
      res.status(200).json(tokenData)
    } catch(err) {
        console.log(err);
        res.status(400).json({ message: "an error occured", err: err });
      };
  });

// FIND ALL TOKENS BY CAMPAIGN
router.get('/camp:id', async (req, res) => {
    try {
      const tokensData = await Token.findAll({
        where: {
            campaign_id: req.params.id
          },
      });
      res.status(200).json(tokensData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// UPDATE TOKEN 
router.put('/camp:id', async (req, res) => {
  try {
    const tokenData = await Token.update(req.body, {
      where: {
        campaign_id: req.params.id,
        token_id: req.body.id
      },
    });
    res.status(200).json(tokenData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE ALL TOKENS BY CAMPAIGN
router.delete('/camp:id', async (req, res) => {
    try {
      const tokenData = await Token.destroy({
        where: {
            campaign_id: req.params.id,
        },
      });
      if (!tokenData) {
        res.status(404).json({ message: 'Tokens all deleted!' });
        return;
      }
      res.status(200).json(tokenData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  // DELETE one TOKEN BY  Token_id
router.delete('/deleteone/camp:id', async (req, res) => {
    try {
      const tokenData = await Token.destroy({
        where: {
            campaign_id: req.params.id,
            token_id: req.body.token_id
        },
      });
      if (!tokenData) {
        res.status(404).json({ message: 'Couldnt delete token!' });
        return;
      }
      res.status(200).json(tokenData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;