const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Proficiency extends Model {}

Proficiency.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
    },
    subtype: {
        type: DataTypes.STRING,
    },
    ability: {
        type: DataTypes.STRING,
    },
    script: {
        type: DataTypes.STRING,
    },
    typicalSpeakers: {
        type: DataTypes.STRING,
    },
},{
    sequelize
});

module.exports = Proficiency;