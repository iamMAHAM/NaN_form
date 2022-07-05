const express = require("express")
const routes = require("./routes/routes")
const logger = require("morgan")
const not_found = require("./middlewares/404")

/*------------ Main App &co------------*/
const app = express()
app.set('view engine', 'ejs')

/*------------ Middlewares ------------*/
app.use(logger("dev"))
app.use(express.static("public"));
app.use(express.json())
app.use("/", routes)
app.use(not_found)


app.listen(3000, async ()=>{
    console.log("server started")
})
