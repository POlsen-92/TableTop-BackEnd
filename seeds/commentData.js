const { Comment } = require("../models");

const seedComment = async () => {
  const commentData = await Comment.bulkCreate([
    {
      body: "Where's My Liver?",
      user_id: 1,
      blog_id: 2
    },
    {
      body: "Wubba Lubba Dub Dub",
      user_id: 1,
      blog_id: 3
    },
    {
      body: "This seems like it'll be fun, let's do it",
      user_id: 2,
      blog_id: 1
    },
    {
      body: "No one want to do a TWD Dungeon, get over it",
      user_id: 2,
      blog_id: 4
    },
    {
      body: "Ridiculous lol",
      user_id: 3,
      blog_id: 1
    },
    {
      body: "A classic",
      user_id: 3,
      blog_id: 2
    },
  ]);
};

module.exports = seedComment;