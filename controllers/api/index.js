const express = require('express');
const router = express.Router();

// The `http://localhost:3001/api/` endpoint

const userRoutes = require("./userController");
router.use("/user",userRoutes);

const campaignRoutes = require("./campaignController");
router.use("/campaign",campaignRoutes);

const characterRoutes = require("./characterController");
router.use("/character",characterRoutes);

const inventoryRoutes = require("./inventoryController");
router.use("/inventory",inventoryRoutes);

const featureRoutes = require("./featureController");
router.use("/feature",featureRoutes);

const proficiencyRoutes = require("./proficiencyController");
router.use("/proficiency",proficiencyRoutes);

const spellRoutes = require("./spellController");
router.use("/spell",spellRoutes);

const usercampaignRoutes = require("./usercampaignController");
router.use("/usercampaign",usercampaignRoutes);

const inviteRoutes = require("./inviteController");
router.use("/invite",inviteRoutes);

const blogRoutes = require("./blogController");
router.use("/blog",blogRoutes);

const commentRoutes = require("./commentController");
router.use("/comment",commentRoutes);

const tokenRoutes = require("./tokenController");
router.use("/token",tokenRoutes);


module.exports = router;