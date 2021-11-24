const express = require('express');
const router = express.Router();

const frontEndRoutes = require("./frontEndRoutes");
router.use(frontEndRoutes);

const apiRoutes = require("./api");
router.use("/api",apiRoutes);

module.exports = router;