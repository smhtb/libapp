const Customer = require("../models/Customer");
const Book = require("../models/Book");
const controller = {};

/**
 * One user buy one book
 * book id and quantity are required
 */
controller.buy = async (req, res) => {
    const { book , quantity } = req.body;
    if(!book || !quantity) {
        res.status(400);
        return res.send({
            status: false,
            message: "Book and Quantity are required.",
            data: {}
        });
    }
    else if(quantity <= 0) {
        res.status(400);
        return res.send({
            status: false,
            message: "Quantity must be a number greater than zero.",
            data: {}
        });
    }
    else {
        try {
            const bookById = await Book.findById(book);
            if(bookById) {
                if(bookById.quantity - quantity < 0) {
                    res.status(400);
                    return res.send({
                        status: false,
                        message: "The number you requested (" + quantity + ") is greater than the number available (" + bookById.quantity + ")",
                        data: {}
                    });
                }
            }
            else {
                res.status(400);
                return res.send({
                    status: false,
                    message: "This book does not exist.",
                    data: {}
                });
            }
        }
        catch(error) {
            res.status(400);
            return res.send({
                status: false,
                message: "This book does not exist.",
                data: {}
            });
        }
        req.body.user = req.userid;
        const newCustomer = await new Customer(req.body).save();
        if(newCustomer) {            
            const bookById = await Book.findByIdAndUpdate(book, {$inc: {quantity: -quantity} });            
            res.status(200);
            res.send({
                status: true,
                message: "Book successfully purchased.",
                data: {newCustomer}
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
    }
};

module.exports = controller;