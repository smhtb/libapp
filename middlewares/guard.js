const jwt = require("jsonwebtoken");
const privateKey = require("../config/config").secretKey;

module.exports = (req, res, next) => {
    const { jwttoken } = req.headers;
    if(!jwttoken) {
        res.send("Authentication error.")
    }
    else {
        jwt.verify(jwttoken, privateKey, function(error, verified) {
            if(error) {
                res.send("Authentication error.")
            }
            if(verified) {
                req.userid = verified.id;
                next();
            }
        })
    }    
}