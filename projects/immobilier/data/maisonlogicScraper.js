function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}
const axios = require("axios")
const { JSDOM } = require('jsdom')
const fs = require("fs");
const path = require("path");

const saveFile = require("./save")

let cardInfos = []
const numberPattern = /\d+/g;
const stringPattern = /^[A-Za-z]+$/

const scraper = (
    url="https://www.maisonsclairlogis.fr/annonce",
    filename="",
    collection="",
    )=>{
			axios.get(url)
      .then((res)=>{
				const { document } = new JSDOM(res.data).window
				Array.from(document.querySelectorAll(".annonce")).map(async div=>{
				console.log(div.querySelector(".prix-number").textContent.replace("€", '').replace(/\s/g, ''))
				const price = parseInt(parseInt(div.querySelector(".prix-number").textContent.replace("€", '').replace(/\s/g, ''))) * 655
				const title = div.querySelector(".nom >span").textContent
				const images = [div.querySelector("img").getAttribute("data-lazy-src")]
				const options = {
					chambre: parseInt(div.querySelector(".chambre").textContent.match(numberPattern).join('')),
					salle: randomChoice([2, 3, 1]),
				}
				const superficie = parseInt(div.querySelector(".surface span").textContent.replace("m2",'').trim())
				cardInfos.push({
					type: 'maison',
					title: title,
					images: images,
					description: `
						Découvrez ce beau modèle en forme de L, qui vous séduira à la fois par son architecture moderne et par son agencement intérieur.
						A triple orientation, l'espace de vie est baigné de lumière. Grâce à une porte-fenêtre, vous profitez d'un accès direct à la terrasse depuis votre cuisine. Trois belles chambres et une salle de bain se situent en retrait la partie jour.

						Le garage intégré bénéficie d'un accès direct à la partie habitable.
						Très belles prestations, projet entièrement personnalisable.
						L'estiamation des VRD est incluse dans le prix.
					`.trim(),
					price: price,
				 	options: options,
				 	area: superficie,
					proposition: 'vente',
          ownerId: '89tUBz2CfUY6aylA3fhYvmj4EPD2',
					location: randomChoice(["abidjan", 'yopougon', 'bingerville', 'yamoussoukro', 'angré', 'abobo'])
				})
    })
    }).then(()=>{
        fs.writeFile(path.join(__dirname, `./${filename}.json`), JSON.stringify(cardInfos, null, space=2), (err)=>{
          err ? console.log(err) : console.log("write done !")
        })
    }).then(()=>{
        saveFile(path.join(__dirname, `./${filename}.json`), collection)
    })
}


// const scraper = (url="", filename="", collection="")=>{
//   axios.get(url)
//   .then(res=>{
//     const { document } = new JSDOM(res.data).window
//     Array.from(document.querySelectorAll(".item"))
//     .map(div=>{
//       const images = [div.querySelector("img").getAttribute("data-lazy-src")]
//       const title = div.querySelector(".nom").textContent.trim()
//       const type = div.querySelector(".gamme").textContent.trim()
//       const description = type + ' ' + div.querySelector(".description").textContent.trim().replace("...", '') + ' personnalisable /'
//       cardInfos.push({
//         title: title,
//         images: images,
//         type: 'plan',
//         description: description,
//         ownerId: '89tUBz2CfUY6aylA3fhYvmj4EPD2',
//         area: randomChoice([100, 90, 350, 139, 65, 89, 94]),
//         options:{
//           chambre: randomChoice([1, 2, 3]),
//           salle: randomChoice[1, 2, 3]
//         },
//         proposition: 'devis',
//         price: randomChoice([50000000, 30000000, 60000000, 765000000, 35000000]),
//         location: randomChoice(['Abidjan', 'Yopougon', 'Man', 'Bingerville', 'Angré', 'Korhogo', 'Bassam'])
//       })
//     })
//   }).then(()=>{
//     fs.writeFile(path.join(__dirname, `./${filename}.json`), JSON.stringify(cardInfos, null, 2), (err=>{
//       err ? console.log(err) : console.log('write done !!!')
//     }))
//   }).then(()=>{
//     saveFile(path.join(__dirname, `./${filename}.json`), collection)
//   })
// }

scraper(url="https://www.maisonsclairlogis.fr/annonce", filename="maison", collection="maison")