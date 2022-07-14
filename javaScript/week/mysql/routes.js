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
    result = users.checkLogin(req.body)
    if (result) res.redirect("/index")
    else res.render("login-register")
})


router.get("/index", (req, res)=>{
    res.render("index")
})

router.post("/update", (req, res)=>{
    console.log(req.body)
    for (prop in req.body){
        if (req.body[prop] !== ''){
            users.UpdateInfo(prop, req.body[prop])
        }
    }
    res.render("index", {
        message: "update successfull"
    })
})

module.exports = router
