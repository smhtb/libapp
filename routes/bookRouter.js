const router = require("express").Router();
const controller = require("../controllers/bookController");

//Insert a new book
router.post("/", controller.insertBook);

//Get list of books
router.get("/list/:page/:pagesize?", controller.getBooks);

//Get one book with id
router.get("/get/:id", controller.getBook);

//Update one book
router.put("/:id", controller.updateBook);

//Delete one book
router.delete("/:id", controller.deleteBook);

module.exports = router;