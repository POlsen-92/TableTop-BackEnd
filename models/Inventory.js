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
    description: {
        type: DataTypes.TEXT,
    },
    properties: {
        type: DataTypes.STRING,
    },
    cost: {
        type: DataTypes.INTEGER,
    },
    weight: {
        type: DataTypes.INTEGER,
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
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    sequelize
});

module.exports = Inventory;