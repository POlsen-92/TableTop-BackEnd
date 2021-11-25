const { Invite } = require("../models");

const seedInvite = async () => {
  const inviteData = await Invite.bulkCreate([
    {
      campaign_id: 1,
      user_id: 2
    },
    {
      campaign_id: 1,
      user_id: 3
    },
    {
      campaign_id: 2,
      user_id: 1
    },
    {
      campaign_id: 2,
      user_id: 3
    },
    {
      campaign_id: 3,
      user_id: 2
    },
    {
      campaign_id: 3,
      user_id: 1
    }
  ]);
};

module.exports = seedInvite;