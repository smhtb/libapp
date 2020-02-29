const jwt = require("jsonwebtoken");
const privateKey = require("../config/config").secretKey;

module.exports = (req, res, next) => {
    const { auth } = req.headers;
    if(!auth) {
        res.send("Authentication error.")
    }
    else {
        jwt.verify(auth, privateKey, function(error, verified) {
            if(error) {
                res.send("Authentication error.")
            }
            if(verified) {
                next();
            }
        })
    }    
}