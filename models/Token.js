const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Token extends Model {}

Token.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    x:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    y:{
        type: DataTypes.INTEGER,
        allowNull:false
    },


},{
    sequelize
});

module.exports = Token;