const { Campaign, UserCampaign } = require("../../models");
const tokenAuth = require("../../middleware/tokenAuth");
const router = require('express').Router();

// The `http://localhost:3001/api/usercampaign` endpoint

// GET ALL USERCAMPAIGN CONNECTIONS
router.get("/all", (req, res) => {
  UserCampaign.findAll()
    .then((dbUsersCampaigns) => {
      if (dbUsersCampaigns.length) {
        res.status(200).json(dbUsersCampaigns);
      } else {
        res.status(404).json({ err: "No User Campaign Connections found!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: "an error occurred" });
    });
});

// ADD USER TO CAMPAIGN
router.post('/', tokenAuth,  async (req, res) => {
  try {
    const usercampaignData = await UserCampaign.create({
      campaign_id: req.body.campaign_id,
      user_id: req.user.id
    })
    res.status(200).json(usercampaignData)
  } catch(err) {
      console.log(err);
      res.status(400).json({ message: "an error occured", err: err });
    };
});

// DELETE USER FROM CAMPAIGN - By User
router.delete("/userdel:id", tokenAuth, (req, res) => {
  UserCampaign.destroy({
    where: {
      campaign_id: req.params.id,
      user_id: req.user.id
    },
  })
  .then((delUserCampaign) => {
    if (delUserCampaign) {
      res.json(delUserCampaign);
    } else {
      res.status(404).json({ err: "User Campaign Connection Can't be Deleted" });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ err: "an error occurred" });
  });
});

// DELETE USER FROM CAMPAIGN - By GM 
router.delete("/gmdel:id", tokenAuth, (req, res) => {
  console.log("req",req);
  Campaign.findOne({
    where: {
      id: req.params.id,
    },
  })
  .then((campaignData) => {
    if (campaignData.gm_id === req.user.id) {
      UserCampaign.destroy({
        where: {
          campaign_id: req.params.id,
          user_id: req.body.user_id
        },
      })
      .then((delUserCampaign) => {
        if (delUserCampaign) {
          res.json(delUserCampaign);
        } else {
          res.status(404).json({ err: "User Campaign Connection Can't be Deleted" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ err: "an error occurred" });
      });
    } else {
      res.status(404).json({ err: "You Can't Delete this Connection" });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ err: "an error occurred" });
  });
});


module.exports = router;