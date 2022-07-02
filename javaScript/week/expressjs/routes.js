const express = require("express")
const router = express.Router()
const getimages = require("./getimages")
const imgs = []


router.get("/", (req, res)=>{
    res.render("index", {
        images: getimages(imgs),
        title : "slide"
    })
})

router.post("/user", (req, res)=>{
    res.send("received on success")
})

module.exports = router
