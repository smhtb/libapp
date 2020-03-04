const User = require("../models/User");

const controller = {};

controller.getUser = (req, res) => {
    const {id} = req.params;
    if(id) {
        User
            .findById(id)
            .then(user => {
                res.send(user);
            })
            .catch(error => {
                res.send({
                    status: false,
                    message: 'Error',
                    data: error
                });
            });
    }
    else {
        res.send({
            status: false,
            message: 'Please send user id',
            data: {}
        });
    }
};

controller.getUsers = (req, res) => {
    User
        .find()
        .then(users => {
            res.send(users);
        })
        .catch(error => {
            res.send({
                status: false,
                message: 'Error',
                data: error
            });
        });    
};

controller.insertUser = (req, res) => {
    const {name, email, password, age, family} = req.body;
    if(!password || !name || !email || !family) {
        res.send({
            status: false,
            message: "Name and Email and Password are required.",
            data: {}
        });
    }
    else if(password.length < 6) {
        res.send({
            status: false,
            message: "Passwotd is shorter than the minimum allowed length (6).",
            data: {}
        });
    }
    else if(age && age < 18) {
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
                            res.send(user);
                        })
                        .catch(error => {
                            res.send({
                                status: false,
                                message: 'Database Error',
                                data: {}
                            });
                        });
                }
            })
            .catch(error => {
                res.send({
                    status: false,
                    message: 'Database Error',
                    data: {}
                });
            });                        
    }
};

controller.updateUser = (req, res) => {
    const {id} = req.params;
    User
        .findByIdAndUpdate(id, req.body, {upsert: true, new: true})
        .then(user => {
            res.send(user);
        })
        .catch(error => {
            res.send({
                status: false,
                message: 'Error',
                data: error
            });
        });
};

controller.deleteUser = (req, res) => {
    const {id} = req.params;
    User
        .findByIdAndDelete(id)
        .then(user => {
            res.send(user);
        })
        .catch(error => {
            res.send({
                status: false,
                message: 'Error',
                data: error
            });
        });
};


module.exports = controller;