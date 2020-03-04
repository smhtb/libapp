const User = require("../models/User");
const jwt = require("jsonwebtoken");
const privateKey = require("../config/config").secretKey;

const controller = {};

/**
 * Login user with email and password
 */
controller.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            res.status(400);
            return res.send({
                status: false,
                message: "Please provide the correct data (email and password).",
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
                        jwt.sign({ id: user._id, email: user.email }, privateKey, { expiresIn: '1h'}, async function(err, token) {
                            if(!err) {
                                await User.findOneAndUpdate({email}, {token});
                                res.status(200);
                                res.send({
                                    status: true,
                                    message: "You are logged in.",
                                    data: {
                                        token: token
                                    }
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
        res.status(500);
        res.send({
            status: false,
            message: "Error",
            data: {}
        });
    }
};

/**
 * Register new user
 * name, family, email and password are required
 * minimum age must be 18 years
 * minimum length for password is 6 character
 * email must be unique
 */
controller.registerUser = (req, res) => {
    const {name, email, password, age, family} = req.body;
    if(!password || !name || !email || !family) {
        res.status(400);
        res.send({
            status: false,
            message: "Name and Email and Password and Family are required.",
            data: {}
        });
    }
    else if(password.length < 6) {
        res.status(400);
        res.send({
            status: false,
            message: "Passwotd is shorter than the minimum allowed length (6).",
            data: {}
        });
    }
    else if(age && age < 18) {
        res.status(400);
        res.send({
            status: false,
            message: "Minimum age must be 18 years.",
            data: {}
        });
    }
    else {        
        User
            .findOne({email: email})
            .then(user => {
                if(user) {
                    res.status(400);
                    res.send({
                        status: false,
                        message: 'There is a user with this email in the system.',
                        data: {}
                    });
                }
                else {                    
                    const newUser = new User(req.body);
                    newUser
                        .save()
                        .then(user => {
                            res.status(200);
                            res.send({
                                status: true,
                                message: 'Signup successful',
                                data: user
                            });
                        })
                        .catch(error => {
                            res.status(500);
                            res.send({
                                status: false,
                                message: 'Database Error',
                                data: {}
                            });
                        });
                }
            })
            .catch(error => {
                res.status(500);
                res.send({
                    status: false,
                    message: 'Database Error',
                    data: {}
                });
            });                        
    }
};

/**
 * Logout user
 */
controller.logout = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.userid, {token: ""}, {new: true});
    if(updatedUser) {
        res.status(200);
        res.send({
            status: true,
            message: 'logout successful',
            data: updatedUser
        });
    }
    else {
        res.status(500);
        res.send({
            status: false,
            message: 'Database Error',
            data: {}
        });
    }
};

module.exports = controller;