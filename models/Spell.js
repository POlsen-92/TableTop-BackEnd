const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Spell extends Model {}

Spell.init({
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
    level: {
        type: DataTypes.STRING,
    },
    duration: {
        type: DataTypes.STRING,
    },
    range: {
        type: DataTypes.STRING,
    },
    attack: {
        type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    sequelize
});

module.exports = Spell;