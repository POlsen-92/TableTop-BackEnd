const User = require('./User');
const Campaign = require ('./Campaign');
const Character = require ('./Character');
const Inventory = require ('./Inventory');
const UserCampaign = require ('./UserCampaign');
const Blog = require("./Blog");
const Comment = require("./Comment");
const Invite = require("./Invite");
const Feature = require("./Feature");
const Proficiency = require("./Proficiency");
const Spell = require("./Spell");
const Token = require("./Token");

//GAMEPLAY CONNECTIONS
    User.belongsToMany(Campaign, {
        through: "UserCampaign",
        unique: false,
        foreignKey: 'user_id',
    })
    Campaign.belongsToMany(User, {
        through: "UserCampaign",
        unique: false,
        foreignKey: 'campaign_id'
    })

    User.hasMany(Campaign, {
        as: "gmCampaign",
        foreignKey: 'gm_id'
    })
    Campaign.belongsTo(User, {
        foreignKey: 'gm_id'
    })
    
    User.hasMany(Character, {
        foreignKey: 'user_id'
    })
    Character.belongsTo(User, {
        foreignKey: 'user_id'
    })
    
    Campaign.hasMany(Character, {
        foreignKey: 'campaign_id'
    })
    Character.belongsTo(Campaign, {
        foreignKey: 'campaign_id'
    })


// CHARACTER INVENTORY AND STUFF
    Character.hasMany(Inventory, {
        // as: "charInventory",
        foreignKey: 'character_id'
    })
    Inventory.belongsTo(Character, {
        foreignKey: 'character_id'
    })

    Character.hasMany(Feature, {
        // as: "charFeature",
        foreignKey: 'character_id'
    })
    Feature.belongsTo(Character, {
        foreignKey: 'character_id'
    }) 

    Character.hasMany(Proficiency, {
        // as: "charProf",
        foreignKey: 'character_id'
    })
    Proficiency.belongsTo(Character, {
        foreignKey: 'character_id'
    })

    Character.hasMany(Spell, {
        // as: "charSpell",
        foreignKey: 'character_id'
    })
    Spell.belongsTo(Character, {
        foreignKey: 'character_id'
    })


//INVITE CONNECTIONS
    User.hasMany(Invite, {
        foreignKey: 'user_id'
    })
    Invite.belongsTo(User, {
        foreignKey: 'user_id'
    })
        
    Campaign.hasMany(Invite, {
        foreignKey: 'campaign_id'
    })
    Invite.belongsTo(Campaign, {
        foreignKey: 'campaign_id'
    })


// COMMUNITY CONNECTIONS
    User.hasMany(Blog, {
        foreignKey: 'user_id'
    });
    Blog.belongsTo(User, {
        foreignKey: 'user_id'
    });
        
    Blog.hasMany(Comment, {
        foreignKey: 'blog_id'
    });
    Comment.belongsTo(Blog, {
        foreignKey: 'blog_id'
    });
        
    Comment.belongsTo(User, {
        foreignKey: 'user_id'
    });
    User.hasMany(Comment, {
        foreignKey: 'user_id'
    });

// TOKEN CONNECTIONS
    Campaign.hasMany(Token,{
        foreignKey: 'campaign_id'
    });
    Token.belongsTo(Campaign, {
        foreignKey: 'campaign_id'
    });
        
module.exports = {User, Campaign, Character, UserCampaign, Blog, Comment, Invite, Inventory, Feature, Proficiency, Spell, Token};