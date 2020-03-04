const router = require("express").Router();
const controller = require("../controllers/authController");
const guard = require("../middlewares/guard");

/**
 * Login to system
 */
router.post("/login", controller.login);

/**
 * Register new user
 */
router.post("/register", controller.registerUser);

/**
 * Logout user 
 */
router.get("/logout", guard, controller.logout);

module.exports = router;