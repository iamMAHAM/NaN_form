const axios = require("axios")
const { JSDOM } = require('jsdom')
const fs = require("fs")
let cardInfos = []

/*
PHARMA DB
title: div.querySelector(".product-brand") ? div.querySelector(".product-brand").textContent : '',
image: div.querySelector(".thumbnail img").getAttribute("data-src"),
description: div.querySelector(".product-subtitle").textContent,
price: div.querySelector(".listing-price span").textContent

*/
const scraper = (
    url="http://google.com",
    selector,
    state="",
    title="",
    image="",
    description="",
    price="",
    )=>{
        axios.get(url).then((res)=>{
            const { document } = new JSDOM(res.data).window
            document.querySelectorAll(selector).map(div=>{
                    cardInfos.push({
                        state: state ? state : '' ,
                        title: title ? title : '',
                        image: image,
                        description: description,
                        price: price
                    })
                })
                fs.writeFile("data.json", JSON.stringify(cardInfos, null, space=4), (err)=>{
                    err ? console.log(err) : console.log("write done !")
                })
            })
}

