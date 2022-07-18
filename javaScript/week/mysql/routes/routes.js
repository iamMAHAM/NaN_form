const router = require("express").Router()


router.get("/", (req, res)=>{res.render("login-register")})
router.post("/ready", (req, res)=>{res.redirect("/index")})

router.get("/index", (req, res)=>{
    console.log(req.session)
    console.log("datos", req.app.get("user"))
    res.render("index", {
        user_data: req.app.get("user")
    })
})

module.exports = router
