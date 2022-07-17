const express = require("express")
const app = express()

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())

app.get("/", (req, res)=>{
    res.render("index")
})

app.post("/snake", (req, res)=>{
    res.render("snake", {
        opponent: JSON.stringify(req.body)
    })
})

module.exports = app