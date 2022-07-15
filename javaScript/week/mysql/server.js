const express = require("express")
const app = express()
const routes = require("./routes/routes")

app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use("/", routes)

app.listen(3000, ()=>{
    console.log("server started")
})