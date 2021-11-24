const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/user",userRoutes);

const blogRoutes = require("./blogController");
router.use("/blog",blogRoutes);

const campaignRoutes = require("./campaignController");
router.use("/campaign",campaignRoutes);

const characterRoutes = require("./characterController");
router.use("/character",characterRoutes);

const commentRoutes = require("./commentController");
router.use("/comment",commentRoutes);

module.exports = router;