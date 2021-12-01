
const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedCampaign = require ('./campaignData');
const seedCharacter = require('./characterData');
const seedUserCampaign = require ('./userCampaignData');
const seedBlog = require ('./blogData');
const seedComment = require ('./commentData');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUser()
  console.log('\n----- USERS SEEDED -----\n');

  await seedCampaign()
  console.log('\n----- CAMPAIGNS SEEDED -----\n');
  
  await seedCharacter()
  console.log('\n----- CHARACTERS SEEDED -----\n');
  
  await seedUserCampaign()
  console.log('\n----- USERCAMPAIGN SEEDED -----\n');

  await seedBlog()
  console.log('\n----- BLOGS SEEDED -----\n');
  
  await seedComment()
  console.log('\n----- COMMENTS SEEDED -----\n');
  
  process.exit(0);
};

seedDatabase();
