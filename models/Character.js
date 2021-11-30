const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model {}

Character.init(
    {
        charName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        personality: {
            type: DataTypes.TEXT,
            default: ''
        },
        age: {
            type: DataTypes.INTEGER,
            default: 1
        },
        race: {
            type: DataTypes.STRING,
            default: '',
        },
        subRace: {
            type: DataTypes.STRING,
            default: '',
        },
        alignment: {
            type: DataTypes.STRING,
            default:'',
        },
        background: {
            type: DataTypes.STRING,
            default: '',
        },
        class: {
            type: DataTypes.STRING,
            default: '',
        }, 
        subClass: {
            type: DataTypes.STRING,
            default:'',
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
        },
        hitpoints : {
            type: DataTypes.INTEGER,
            default: 0
        },
        temphitpoints : {
            type: DataTypes.INTEGER,
            default: 0
        },
        currhitpoints : {
            type: DataTypes.INTEGER,
            default: 0
        },
    },
    {
        sequelize,
    },
)

module.exports = Character;