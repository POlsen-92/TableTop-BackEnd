const { User, Campaign, Character, Blog, Comment, UserCampaign, Invite, Inventory } = require("../../models");
const jwt = require("jsonwebtoken");
const tokenAuth = require("../../middleware/tokenAuth");
const bcrypt = require("bcrypt");
require("dotenv").config();

// The `http://localhost:3001/api/inventory` endpoint







module.exports = router;