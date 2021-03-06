const mongoose = require("../bootstrap/database");
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    family: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: false,
        min: 18
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    token: {
        type: String
    },
    avatar: {
        type: String
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
}, {
    timestamps: true
});

UserSchema.methods.comparePassword = function(password, cb) {
    const user = this;
    bcrypt.compare(password, user.password, function(error, isMatched) {
        if(isMatched) {
            cb(null, isMatched);
        }
        else {
            cb("error", false);
        }
    });
}

UserSchema.pre('save', function(next) {
    const user = this;
    
    bcrypt.hash(user.password, bcrypt.genSaltSync(10), function(error, encrypted) {
        user.password = encrypted;
        next();
    });
    
});

module.exports = mongoose.model('User', UserSchema);