const router = require("express").Router();
const controller = require("../controllers/authController");
const guard = require("../middlewares/guard");
const avatar = require("../middlewares/avatarUpload");

/**
 * Login to system
 */
router.post("/login", controller.login);

/**
 * Register new user
 */
router.post("/register", avatar, controller.registerUser);

/**
 * Logout user 
 */
router.get("/logout", guard, controller.logout);

module.exports = router;