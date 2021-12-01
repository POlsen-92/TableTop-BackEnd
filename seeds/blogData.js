const { Blog } = require("../models");

const seedBlog = async () => {
  const blogData = await Blog.bulkCreate([
    {
      title: "Looking for a Campaign",
      description: "I wanna play a stealthy orc, know it sounds weird but it's gonna be rad",
      user_id: 1
    },
    {
        title: "Looking for Players to Join my new Campaign",
        description: "We're looking for candy mountain Charlie",
        user_id: 2
    },
    {
        title: "Time to Get Rickety Recked",
        description: "Let's play some rick and morty D&D",
        user_id: 3
    },
    {
        title: "CAAAAAAAAAAAAAAAAARRRRRLLLLL",
        description: "NOOOOOOOOOO",
        user_id: 3
    },

  ]);
};

module.exports = seedBlog;
