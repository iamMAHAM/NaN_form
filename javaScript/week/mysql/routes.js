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

        // res.send(template("ok", {message: 'account created successfully'}))
        // res.send("requests successfull")
        res.redirect("/hhgdjgjdh")
    }else{
        console?.log("lol")
        res.send(200, body=template("false", {user: 'an error has occured'}))
    }
})

router.post("/login", (req, res)=>{
    res = users.checkLogin(req.body)
})

module.exports = router
