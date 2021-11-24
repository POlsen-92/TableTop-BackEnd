const { Campaign } = require("../models");

const seedCampaign = async () => {
    const campaignData = await Campaign.bulkCreate([
        {
          name: "the big sink",
          gm_id:2,
          description: "the biggest sink is cool beans"
        },
        {
          name: "the greats",
          gm_id:1,
          description: "The GREATEST EVER"
        },
      ]);
};

module.exports = seedCampaign;