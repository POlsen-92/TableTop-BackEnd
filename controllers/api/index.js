const express = require('express');
const router = express.Router();

// The `http://localhost:3001/api/` endpoint

const userRoutes = require("./userController");
router.use("/user",userRoutes);

const campaignRoutes = require("./campaignController");
router.use("/campaign",campaignRoutes);

const characterRoutes = require("./characterController");
router.use("/character",characterRoutes);

const usercampaignRoutes = require("./usercampaignController");
router.use("/usercampaign",usercampaignRoutes);

const inviteRoutes = require("./inviteController");
router.use("/invite",inviteRoutes);

const blogRoutes = require("./blogController");
router.use("/blog",blogRoutes);

const commentRoutes = require("./commentController");
router.use("/comment",commentRoutes);

module.exports = router;