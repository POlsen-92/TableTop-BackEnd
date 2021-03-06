const jwt = require("jsonwebtoken")
require("dotenv").config();

const tokenAuth = function(req,res,next){
    if(req.headers.authorization){
        const token =req.headers.authorization.split(" ").pop();
        jwt.verify(token, process.env.TOKEN_KEY,function(err,data){
            if(err){
                console.log('token error ' + err)
                return res.status(403).send("invalid token")
            } else {
                req.user = data;
                next()
            }
        })
    } else {
        console.log("bad");
        return res.status(403).send("include your token")
    }
}

module.exports = tokenAuth