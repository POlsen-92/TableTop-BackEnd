const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Feature extends Model {}

Feature.init({
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
    }
},{
    sequelize
});

module.exports = Feature;