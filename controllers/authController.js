const User = require("../models/User");
const jwt = require("jsonwebtoken");
const privateKey = require("../config/config").secretKey;

const controller = {};

controller.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            res.status(400);
            return res.send({
                status: false,
                message: "Please provide the correct data.",
                data: {}
            })
        }
        else {
            const user = await User.findOne({email})
            if(!user) {
                res.status(404);
                return res.send({
                    status: false,
                    message: "This username does not exist.",
                    data: {}
                })
            }
            else {
                user.comparePassword(password, function(error, isMatched) {
                    if(isMatched) {
                        jwt.sign({ id: user._id, email: user.email }, privateKey, { expiresIn: '1h'}, function(err, token) {
                            if(!err) {
                                res.status(200);
                                res.send({
                                    status: true,
                                    message: "You are logged in.",
                                    data: token
                                });
                            }
                            else {
                                res.status(500);
                                res.send({
                                    status: false,
                                    message: "Error in create token",
                                    data: {}
                                });
                            }
                        });
                    }
                    else {
                        res.status(404);
                        res.send({
                            status: false,
                            message: "Password is incorrect",
                            data: {}
                        });
                    }
                });
            }  
        }
    }
    catch(e) {

    }
};

module.exports = controller;