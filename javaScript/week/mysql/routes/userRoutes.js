const userController = require("../controllers/userController")
const router = require("express").Router()

router.post("/create", userController.insertUser)
router.post("/login", userController.loginUser)
router.post("/update", userController.updateUser)
router.delete("/delete", userController.deleteUser)

module.exports = router