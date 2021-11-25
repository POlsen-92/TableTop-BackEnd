const { User, Campaign, Character, Blog, Comment, UserCampaign, Invite, Inventory } = require("../../models");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const tokenAuth = require("../../middleware/tokenAuth");
const bcrypt = require("bcrypt");
require("dotenv").config();

// The `http://localhost:3001/api/usercampaign` endpoint

// GET ALL USERCAMPAIGN CONNECTIONS
router.get("/all", (req, res) => {
    UserCampaign.findAll()
      .then((dbUsersCampaigns) => {
        if (dbUsersCampaigns.length) {
          res.json(dbUsersCampaigns);
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
router.post('/:id', tokenAuth,  async (req, res) => {
    try {
      const usercampaignData = await UserCampaign.create({
        campaign_id: req.params.id,
        user_id: req.user.id
      })
      res.status(200).json(usercampaignData)
    } catch(err) {
        console.log(err);
        res.status(400).json({ message: "an error occured", err: err });
      };
  });






module.exports = router;