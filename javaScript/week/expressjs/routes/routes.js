const express = require("express")
const getImages = require("../utilities/getimages")
const router = express.Router()
let images = []

router.get("/", async (req, res)=>{
    images = await getImages(images)
    res.render("index", {
        images: images,
        title : "slide"
    })
})

router.post("/user", (req, res)=>{
    res.send("received on success")
})

module.exports = router
