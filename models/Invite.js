const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Invite extends Model {}

Invite.init(
    {

    },
    {
        sequelize,
    },
    
)

module.exports = Invite;