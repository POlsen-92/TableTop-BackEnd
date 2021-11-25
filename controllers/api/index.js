const express = require('express');
const router = express.Router();

// The `http://localhost:3001/api/` endpoint

const userRoutes = require("./userController");
router.use("/user",userRoutes);

const blogRoutes = require("./blogController");
router.use("/blog",blogRoutes);

const campaignRoutes = require("./campaignController");
router.use("/campaign",campaignRoutes);

const usercampaignRoutes = require("./usercampaignController");
router.use("/usercampaign",usercampaignRoutes);

const characterRoutes = require("./characterController");
router.use("/character",characterRoutes);

const commentRoutes = require("./commentController");
router.use("/comment",commentRoutes);

const inviteRoutes = require("./inviteController");
router.use("/invite",inviteRoutes);

module.exports = router;