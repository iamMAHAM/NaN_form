const express = require("express")
const app = express()
const routes = require("./routes")

app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(express.json())
app.use("/", routes)

app.listen(4000, ()=>{
    console.log("server started")
})