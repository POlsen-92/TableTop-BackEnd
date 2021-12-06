const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author_image: {
        type: DataTypes.TEXT,
        default: 'https://avatars.dicebear.com/api/pixel-art/sdfsdfsdfsdfsdfs.svg'
    }   
},{
    sequelize
});

module.exports = Blog;