const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Inventory extends Model {}

Inventory.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cost: {
        type: DataTypes.INTEGER,
    },
    weight: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.TEXT,
    },
    armorClass: {
        type: DataTypes.INTEGER,
    },
    strength: {
        type: DataTypes.INTEGER,
    },
    stealth: {
        type: DataTypes.INTEGER,
    },
    damage: {
        type: DataTypes.INTEGER,
    },
    properties: {
        type: DataTypes.INTEGER,
    },
},{
    sequelize
});

module.exports = Inventory;