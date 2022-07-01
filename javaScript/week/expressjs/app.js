const express = require("express")
const fetch = require("axios").default
const images = []
const app = express()

app.set('view engine', 'ejs')

app.use(express.static("public"));

app.use(async (req, res, next)=>{
    let resuls = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=714e977060730eeb086fbb1570c15633&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")
    for (let i = 0; i < resuls.data.results.length; i++)
    {
        images.push("https://image.tmdb.org/t/p/w500"+resuls.data.results[i].poster_path)
    }
    next()
})

app.get("/", (req, res)=>{
    res.render("index", {
        images: images,
        title : "slide"
    })
})

app.use((req, res)=>{
    res.render("404")
})

app.listen(3000, async ()=>{
    console.log("serveur démarré")
})
