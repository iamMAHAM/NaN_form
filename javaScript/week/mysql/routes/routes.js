const router = require("express").Router()


router.get("/", (req, res)=>{res.render("login-register")})

router.get("/index", (req, res)=>{
    res.render("index", {
        user_data: req.app.get("user")
    })
})

module.exports = router
