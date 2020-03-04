const router = require("express").Router();

const controller = require("../controllers/customerController");

// Buy a book
router.post("/", controller.buy);

module.exports = router;