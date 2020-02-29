const User = require("../models/User");
const jwt = require("jsonwebtoken");
const privateKey = require("../config/config").secretKey;

const controller = {};

controller.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.send({
                status: false,
                message: "Please provide the correct data.",
                data: {}
            })
        }
        else {
            const user = await User.findOne({email})
            if(!user) {
                return res.send({
                    status: false,
                    message: "This username does not exist.",
                    data: {}
                })
            }
            else {
                user.comparePassword(password, function(error, isMatched) {
                    if(isMatched) {
                        jwt.sign({ email: user.email }, privateKey, { expiresIn: '1h'}, function(err, token) {
                            if(!err) {
                                res.send({
                                    token
                                });
                            }
                            else {
                                res.send("Error in create token");
                            }
                        });
                    }
                    else {
                        res.send("Error Login");
                    }
                });
            }  
        }
    }
    catch(e) {

    }
};

module.exports = controller;