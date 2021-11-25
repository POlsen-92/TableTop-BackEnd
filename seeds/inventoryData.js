const { Inventory } = require("../models");

const seedInventory = async () => {
  const inventoryData = await Inventory.bulkCreate([
    {
      name: "Bow of Thunder",
      type: "Weapon",
      character_id: 1
    },
    {
      name: "Flute that Screams",
      type: "Instrument",
      character_id: 2
    },
    {
      name: "BloodStone",
      type: "Gemstone",
      character_id: 3
    },
    {
      name: "Druidcraft",
      type: "Spell",
      character_id: 4
    },
    {
      name: "A Mummified Goblin Hand",
      type: "Trinket",
      character_id: 5
    },
    {
      name: "Bead of Nourishment",
      type: "Wondrous Item",
      character_id: 6
    },
  ]);
};

module.exports = seedInventory;