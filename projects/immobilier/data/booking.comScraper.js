const cardInfos = []
const path = require("path")
const BASE_URL = "https://www.booking.com/"
function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}

const prices = [
  250000,
  357800,
  258000,
  127800,
  215490,
  124677,
]
const axios = require("axios")
const { JSDOM } = require('jsdom')
const fs = require("fs");
const saveFile = require("./save");
const numberPattern = /\d+/g;
const stringPattern = /^[A-Za-z]+$/

const scraper = (
    url="https://www.booking.com/city/ci/abidjan.fr.html?aid=301664;label=abidjan-O2dJnNoNwLwQFyOtUDRZ0wS260937416810:pl:ta:p1115:p2:ac:ap:neg:fi:tikwd-1904087563:lp1003643:li:dec:dm:ppccp=UmFuZG9tSVYkc2RlIyh9YSNxgVPQVI7AMnn1KDvPMRs;ws=&gclid=CjwKCAjwm8WZBhBUEiwA178UnGKO7bwnp9zo40f6Jq72JZ4R87xXa_DtORf88QHncWQridyYW89X1hoCBsUQAvD_BwE"
    )=>{
			axios.get(url)
      .then((res)=>{
				const { document } = new JSDOM(res.data).window
				Array.from(document.querySelectorAll(".js-sr-card")).map(async div=>{
				const link = div.querySelector(".bui-spacer--medium > a").href
        const title = div.querySelector(".bui-card__title").textContent.trim()
        let description = null
        let presloc = null
        let coordinate = null
        // const description = div.querySelector('.hotel-card__text').textContent.replace('Voir plus', '').replace("Voir moins", '').trim()
				const images = [div.querySelector("img").getAttribute("src")]
        const location = div.querySelector('.bui-card__subtitle > span').textContent
        // const price = JSON.parse(div.querySelector(".bui-price-display__value.bui-f-color-constructive")?.textContent.replace('€', '').trim()) * 650
        const price = randomChoice(prices)
        const superficie = Math.floor(Math.random() * (30 - 25) + 20)
        const options = {
					chambre: 1,
					salle: Math.ceil(Math.random() * 4),
				}
        axios.get(BASE_URL + link)
        .then(res=>{
          const { document } = new JSDOM(res.data).window
          Array.from(document.querySelectorAll(".bh-photo-grid-thumb-cell img"))
          .map(img=>images.push(img.getAttribute("src")))
          description = document.querySelector("#property_description_content").textContent.trim()
          presloc = document.querySelector(".hp_address_subtitle.js-hp_address_subtitle.jq_tooltip").textContent
          coordinate = document.querySelector("#hotel_sidebar_static_map").getAttribute("data-atlas-latlng").split(',')
          
        })
        .then(()=>{
          cardInfos.push({
            type: 'maison',
            title: title,
            images: images,
            description: description,
            price: price,
            options: options,
            area: superficie,
            proposition: 'location',
            coordinate: coordinate,
            location: location.trim(),
            presloc : presloc.trim(),
            ownerId: randomChoice(['zsHm67Xam6bfrPNUbPCRkHGJZz33', '89tUBz2CfUY6aylA3fhYvmj4EPD2'])
          })
        })
        .then(()=>{
          fs.writeFile(path.join(__dirname, "./hotel.json"), JSON.stringify(cardInfos, null, space=2), (err)=>{
            err ? console.log(err) : console.log("write done !")
          })
        })
			})
    })
    .catch(e=>console.log(e.message))
}

// scraper("https://www.booking.com/city/ci/abidjan.fr.html?label=abidjan-PiUbqVBIxCvFYhNaB3WzCwS496646975247%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-417548833093%3Alp1003643%3Ali%3Adec%3Adm;ws=;aid=1610680;gclid=CjwKCAjwvsqZBhAlEiwAqAHElYqeKttVlfuJkAJwRvDWaAAjCJC7uOvvayeGKWaUyzL1dVfBCJLXxBoCKSIQAvD_BwE")
saveFile(path.join(__dirname, './hotel.json'), 'hotel')
	