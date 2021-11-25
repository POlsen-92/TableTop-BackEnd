const express = require("express");
const router = express.Router();
const { User, Campaign, Character, Blog, Comment, UserCampaign, Invite } = require("../../models");
const jwt = require("jsonwebtoken");
const tokenAuth = require("../../middleware/tokenAuth");
const bcrypt = require("bcrypt");
require("dotenv").config();

// The `http://localhost:3001/api/invite` endpoint

// GET ALL INVITES
router.get("/all", (req, res) => {
    Invite.findAll()
      .then((dbInvites) => {
        if (dbInvites.length) {
          res.json(dbInvites);
        } else {
          res.status(404).json({ err: "No Invites found!" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ err: "an error occurred" });
      });
  });

  // GET ALL INVITES FOR ONE USER
router.get('/user/:id', async (req, res) => {
  try {
    const campaignData = await Campaign.findAll({
      where: {
        user_id: req.params.id
      },
      include: [User, Character],
    });
    res.status(200).json(campaignData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// SEND INVITE TO USER FROM CAMPAIGN
router.post('/',  async (req, res) => {
    try {
      const inviteData = await Invite.create({
        campaign_id: req.body.campaign_id,
        user_id: req.body.user_id
      })
      res.status(200).json(inviteData)
    } catch(err) {
        console.log(err);
        res.status(400).json({ message: "an error occured", err: err });
      };
  });

// DELETE INVITE
router.delete('/:id', tokenAuth, async (req, res) => {
    try {
      const inviteData = await Invite.destroy({
        where: {
          id: req.params.id,
          user_id: req.user.id
        },
      });
      if (!inviteData) {
        res.status(404).json({ message: 'No Invite with this id!' });
        return;
      }
      res.status(200).json(inviteData);
    } catch (err) {
      res.status(500).json(err);
    }
  });





module.exports = router;