const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Invite extends Model {}

Invite.init(
    {
        campaign_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        campaign_name: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
    },
    
)

module.exports = Invite;