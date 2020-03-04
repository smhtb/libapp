const jwt = require("jsonwebtoken");
const privateKey = require("../config/config").secretKey;
const User = require("../models/User");

module.exports = (req, res, next) => {
    const { jwttoken } = req.headers;
    if(!jwttoken) {
        res.status(400);
        res.send({
            status: false,
            message: "Please provide jwttoken in your request header.",
            data: {}
        });
    }
    else {
        jwt.verify(jwttoken, privateKey, async function(error, verified) {
            if(error) {
                res.status(400);
                return res.send({
                    status: false,
                    message: "Your token could not be verified.",
                    data: {}
                });
            }
            if(verified) {
                const findedUser = await User.findById(verified.id);
                if(findedUser.token != jwttoken) {
                    res.status(400);
                    return res.send({
                        status: false,
                        message: "Your token could not be verified.",
                        data: {}
                    });                    
                }
                else {
                    req.userid = verified.id;
                    next();
                }
            }
        })
    }    
}