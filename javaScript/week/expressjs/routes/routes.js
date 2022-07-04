const express = require("express")
// const images = require("../utilities/getimages")
const router = express.Router()
// const imgs = []


router.get("/", async (req, res)=>{
    res.render("index", {
        images: JSON.stringify(images),
        title : "slide"
    })
})

router.post("/user", (req, res)=>{
    res.send("received on success")
})

module.exports = router
