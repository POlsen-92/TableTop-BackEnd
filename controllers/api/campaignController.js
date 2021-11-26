const { User, Campaign, Character, Blog, Comment, UserCampaign, Invite, Inventory } = require("../../models");
const router = require('express').Router();
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
    const usercampaignData = await UserCampaign.create({
      campaign_id: campaignData.id,
      user_id: req.user.id
    })
    res.status(200).json([campaignData, usercampaignData])
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
    if (!campaignData) {
      res.status(404).json({ message: 'No Campaigns found, You should make One!' });
      return;
    }
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
    if (!campaignData) {
      res.status(404).json({ message: 'This User is not a GM of any Campaigns!' });
      return;
    }
    res.status(200).json(campaignData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// FIND ONE CAMPAIGN
router.get('/:id', async (req, res) => {
  try {
    const campaignData = await Campaign.findByPk(req.params.id, {
      include: [User, Character],
    });
    if (!campaignData) {
      res.status(404).json({ message: 'No Campaign found!' });
      return;
    }
    res.status(200).json(campaignData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE CAMPAIGN 
router.put('/:id', tokenAuth, async (req, res) => {
  try {
    const campaignData = await Campaign.update(req.body, {
      where: {
        id: req.params.id,
        gm_id: req.user.id
      },
    });
    if (!campaignData[0]) {
      res.status(404).json({ message: 'Not Able to Update this Campaign!' });
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
      res.status(404).json({ message: 'Not able to Destroy this Campaign!' });
      return;
    }
    res.status(200).json(campaignData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  


module.exports = router;
