const router = require("express").Router()


router.get("/", (req, res)=>{res.render("image")})
router.get("/register", (req, res)=>{res.render("register")})
router.get("/index", (req, res)=>{res.render("dashboard")
})

module.exports = router
