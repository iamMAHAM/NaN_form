let div_words = document.querySelector("div.word")
let word_input = document.querySelector("#input")
let score = document.querySelector("#score")
let level = document.querySelector("#level")
let timer = document.querySelector("#timer")
let found = document.querySelector("#found")
let levels = null
let currentLevel = null
let inter  = null
const alphabet = "abcdefghijklmnopqrstuvwxyz"

/*----------intervall--------*/
inter = setInterval(()=>{
    timer.textContent = parseInt(timer.textContent) - 1
    if (parseInt(timer.textContent) === 0){
        checkReverse()
    }
}, 1000)

/*---------functions---------*/

function randomLetter(){
    let r = Math.floor(Math.random() * alphabet.length)
    return alphabet[r]
}

function genWords(word_length){
    let word = ""
    for (let i = 0; i < word_length; i++){
        word += randomLetter()
    }
    return word.toUpperCase()
}

function changeWord(word_length){
    div_words.textContent = genWords(word_length)
}

function reverseString(string = ""){
    let total = string.length - 1
    let reverse = ""
    for (let i = total; i >= 0; i--){
        reverse += string[i]
    }
    return reverse
}

function checkReverse(){
    clearInterval(inter)
    original = reverseString(div_words.textContent.trim())
    pReverse = word_input.value
    console.log("original", original, "reverse", pReverse)
    original === pReverse.toUpperCase() ? success() : failed()
    timer.textContent = currentLevel.time
    changeWord(currentLevel.word_length)
    word_input.value = ""
    word_input.focus()
    console.log("new_time to handle", timer.textContent)
    console.log(inter)
    inter = setInterval(()=>{
        timer.textContent = parseInt(timer.textContent) - 1
        if (parseInt(timer.textContent) === 0){
            checkReverse()
        }
    }, 1000)
    setInterval(inter, 1000)
}
 
function success(){
    n = parseInt(found.textContent) + 1
    score.textContent = parseInt(score.textContent) + 5
    found.textContent = n
    if (n === currentLevel.found){
        nextLevel()
    }
}

function failed(){
    if (parseInt(score.textContent)){
        score.textContent = parseInt(score.textContent) - 5
    }
    found.textContent = 0
}

function nextLevel(){
    currentLevel = levels[currentLevel.level]
    level.textContent = currentLevel.level
    found.textContent = 0
    timer.textContent = currentLevel.time
}

/*--------eventListeners------*/

window.addEventListener("load", async ()=>{
    levels = await fetch("./levels.json")
    levels = await levels.json()
    currentLevel = levels[0]

    changeWord(currentLevel.word_length)
    setInterval(inter)

    word_input.addEventListener("keypress", (e)=>{
        e.key === 'Enter' ? checkReverse() : null
    })
})