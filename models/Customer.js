const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Customer", CustomerSchema);