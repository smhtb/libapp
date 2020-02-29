const router = require("express").Router();
const controller = require("../controllers/userController");

//List of users
router.get('/list', controller.getUsers);

//Get one user
router.get('/get/:id?', controller.getUser);

//Insert new user
router.post('/', controller.insertUser);

//Update one user
router.put("/:id", controller.updateUser);


//Delete one user
router.delete("/:id", controller.deleteUser);

module.exports = router;