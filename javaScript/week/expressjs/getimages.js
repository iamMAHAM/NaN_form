const express = require("express")
const router = express.Router()

const getimages = async (images)=>{
    let resuls = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=714e977060730eeb086fbb1570c15633&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")
    for (let i = 0; i < resuls.data.results.length; i++)
    {
        images.push("https://image.tmdb.org/t/p/w500"+resuls.data.results[i].poster_path)
    }
    return images
}

module.exports = getimages
module.exports = router