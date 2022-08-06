const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dbUrl = "mongodb+srv://iamMAHAM:whAWMOU67Fhdq3Na@cluster0.up34ivg.mongodb.net/node-app"
const users = require("./models/user")

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.get("/", (req, res)=>{
    users.find((err, result)=>{
        console.log(result)
        res.render("index", {title: "Bienvenue", users: result})
    })
})

app.get("/users", (req, res)=>{
    users.find((err, result)=>{
        res.send(result)
    })
})

app.get("/f", (req, res)=>{
    users.findById("62ee58b31221b9e873b6f02c", (err, result)=>{
        res.send(result)
    })
})

mongoose.connect(dbUrl, (err, result)=>{
    if (err) console.log(err)
    console.log("Connect with success")
    app.listen(3000, ()=>{
        console.log("server started")
    })
})