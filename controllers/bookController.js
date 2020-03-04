const Book = require("../models/Book");
const User = require("../models/User");
const controller = {};

/**
 * Insert new book to books
 * Push book id in user
 */
controller.insertBook = async (req, res) => {
    const { title, description, author, quantity } = req.body;
    if(!title || !author || !quantity) {
        res.status(400);
        return res.send({
            status: false,
            message: "Title and Author and Quantity are required.",
            data: {}
        });
    }
    if(quantity > 0) {
        req.body.user = req.userid;
        const newBook = await new Book(req.body).save();
        if(newBook) {
            const updatedUser = await User.findByIdAndUpdate(req.userid, {$push: {books: newBook}});            
            res.status(200);
            res.send({
                status: true,
                message: "Book successfully added.",
                data: {newBook}
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
    else {
        res.status(400);
        return res.send({
            status: false,
            message: "Quantity must be greater than zero.",
            data: {}
        });
    }
};

/**
 * Get list of books
 * Nedd two params (page(required), pagesize(optional))
 * Default page is 1
 * Default pagesize is 10
 */
controller.getBooks = async (req, res) => {
    let { page , pagesize } = req.params;
    page = page - 1;
    if(!pagesize) {
        pagesize = 10;
    }
    else if(pagesize > 20) {
        pagesize = 20;
    }
    const books = await Book.find().limit(pagesize).skip(page * pagesize);
    if(books) {
        res.status(200);
        res.send({
            status: true,
            message: 'List of books (Max page size is 20)',
            data: books
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

/**
 * Get one book with id
 */
controller.getBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);    
        if(book) {
            res.status(200);
            res.send({
                status: true,
                message: 'Your book was found.',
                data: book
            });
        }       
    }
    catch(error) {
        res.status(404);
        res.send({
            status: false,
            message: 'Book not found',
            data: {}
        });
    }
};

//Update one book
controller.updateBook = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {upsert: true, new: true});
        if(updatedBook) {
            res.status(200);
            res.send({
                status: true,
                message: 'Your book has been updated.',
                data: updatedBook
            });
        }
    }
    catch(error) {
        res.status(500);
        res.send({
            status: false,
            message: 'Error',
            data: {}
        });
    }
};

//Delete one book
controller.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if(deletedBook) {
            res.status(200);
            res.send({
                status: true,
                message: 'Your book has been deleted.',
                data: deletedBook
            });
        }
    }
    catch(error) {
        res.status(500);
        res.send({
            status: false,
            message: 'Error',
            data: {}
        });
    }
};

module.exports = controller;