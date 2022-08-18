const userController = require("../controllers/userController")
const router = require("express").Router()

router.post("/create", userController.insertUser)
router.post("/test", userController.requestCreate)
router.get("/:token", userController.insert)
router.post("/login", userController.loginUser)
router.put("/update", userController.updateUser)
router.delete("/delete", userController.deleteUser)


module.exports = router