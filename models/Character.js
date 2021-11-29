const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model {}

Character.init(
    {
        charName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        race: {
            type: DataTypes.STRING,
        },
        subRace: {
            type: DataTypes.STRING,
            default: '',
        },
        background: {
            type: DataTypes.STRING,
            default: '',
        },
        class: {
            type: DataTypes.STRING,
        }, 
        subClass: {
            type: DataTypes.STRING,
            default:'',
        },
        feats: {
            type: DataTypes.STRING,
            default: ''
        },
        level: {
            type: DataTypes.INTEGER,
            default: 1
        },
        image_content: {
            type: DataTypes.STRING,
            default: '',
        },
        strength : {
            type: DataTypes.INTEGER,
            default: 0
        },
        dexterity : {
            type: DataTypes.INTEGER,
            default: 0
        },
        constitution : {
            type: DataTypes.INTEGER,
            default: 0
        },
        intelligence : {
            type: DataTypes.INTEGER,
            default: 0
        },
        wisdom : {
            type: DataTypes.INTEGER,
            default: 0
        },
        charisma : {
            type: DataTypes.INTEGER,
            default: 0
        },
        speed: {
            type: DataTypes.INTEGER,
            default: 0
        }
    },
    {
        sequelize,
    },
)

module.exports = Character;