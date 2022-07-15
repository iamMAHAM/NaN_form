const express = require("express")
const router = express.Router()
const users  = require("./middlewares/users")


const template = (status="", data={})=>{
    return {
        status: status,
        results: data
    }
}

router.get("/", (req, res)=>{
    res.render("login-register")
})

router.post("/create", (req, res)=>{
    console.log(req.body)
    if (users.createUser(req.body)){
        console.log("great")
        res.send(template("ok", {message: 'account created successfully'}))
    }else{
        console?.log("lol")
        res.send(template("false", {user: 'an error has occured'}))
    }
})

router.post("/login", (req, res)=>{
    console.log(req.body)
    users.checkLogin(req.body, (result)=>{
        if (result.res){
            req.app.set("user", result)
            res.redirect("/index")
        }
        else res.render("login-register")
    })
})


router.get("/index", (req, res)=>{
    console.log("((((==========))))")
    console.log(req.app.get("user"))
    console.log("((((==========))))")
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

module.exports = router
