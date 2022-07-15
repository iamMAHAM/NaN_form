const express = require("express")
const UserController = require("../controllers/user.controller")
const users = require("../middlewares/users")
const validate = require("../middlewares/validate")
const router = express.Router()


const template = (status="", data={})=>{
    return {
        status: status,
        results: data
    }
}

router.get("/", (req, res)=>{res.render("login-register")})
router.post("/create", UserController.insertUser)
router.post("/login", UserController.loginUser)

router.get("/index", (req, res)=>{
    res.render("index", {
        user_data: req.app.get("user")
    })
})

router.post("/update", (req, res)=>{
    for (prop in req.body){
        if (req.body[prop] !== ''){
            users.UpdateInfo(prop, req.body[prop], req.app.get("user").res.id, (new_user)=>{
                req.app.set("user", new_user)
            })
        }
    }
    res.redirect("/index")
})

router.post("/delete", (req, res)=>{
    // console.log("body", req.body)
    users.deleteUser(req.body.message.res.id)
    res.send(JSON.stringify({
        status: "success"
    }))
})

module.exports = router
