const { default: axios } = require("axios")
const { JSDOM } = require("jsdom")
const path = require("path")
const fs = require("fs")
const cardInfos = []
const saveFile = require("./save")
const numberPattern = /\d+/g;


const randomChoice = (arr)=>{
  return arr[Math.floor(arr.length * Math.random())];
}

const scrape = (
  url="https://abidjan.locanto.ci/Terrains-a-vendre/352/",
  filename=""
)=>{
  axios.get(url)
  .then(res=>{
    const { document } = new JSDOM(res.data).window
    Array.from(document.querySelectorAll(".bp_ad.bp_ad--big_list.big_list > a"))
    .map(a=>{
      axios.get(a.href)
      .then((res)=>{
        const { document } = new JSDOM(res.data).window
        const price = parseInt(document.querySelector(".h1gray").textContent.match(numberPattern).slice(1).join(''))
        const tmp = document.querySelector(".header-text").textContent?.match("m²") || {
          index: 4,
          input: '350 m² - ' + document.querySelector(".header-text").textContent
        }
				const title = tmp.input.slice(tmp.index + 5)
				const images = []
        Array.from(document.querySelectorAll('#vap_images img')).map(img=>images.push(img.getAttribute("src")))
				const superficie = parseInt(tmp.input.slice(0, tmp.index).trim())
        const descriptiton = document.querySelector("#js-user_content").textContent.trim()
        const coordinate = document.querySelector("#item_coordinates").textContent.split("\n").filter(c=>c.length > 0)
        const location = document.querySelector(".address >div >div").children[0].textContent
				cardInfos.push({
					type: 'maison',
					title: title,
					images: images,
					description: descriptiton,
					price: price,
				 	area: superficie,
          coordinate: coordinate,
					proposition: 'location',
          ownerId: randomChoice(['zsHm67Xam6bfrPNUbPCRkHGJZz33', '89tUBz2CfUY6aylA3fhYvmj4EPD2']),
					location: location
				})
      })
      .then(()=>{
        fs.writeFile(path.join(__dirname, `./maisonLd.json`), JSON.stringify(cardInfos, null, space=2), (err)=>{
          err ? console.log(err) : console.log("write done !")
        })
      })
      .catch(e=>console.log(e.message))
    })
  })
}

// scrape("https://www.locanto.ci/Location-maison/307/")
saveFile('./maisonLd.json', 'maison')  