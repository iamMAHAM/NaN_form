const express = require("express")
const axios = require("axios")
const router = express.Router()
const path = require("path")
const fs = require("fs")
let logos = []

console.log(fs.readFile(path.join(__dirname, "links.json"), (err, data)=>{
    if (err) throw err
    logos = JSON.parse(data)
    console.log(logos)
}))

router.get("/", (req, res)=>{

    res.render("index", {
        logos : logos
    })
})

router.use((req, res)=>{
    res.render("404")
})

module.exports = router