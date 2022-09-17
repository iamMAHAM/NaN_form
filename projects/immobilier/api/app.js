import express from "express"
import { firebaseApp } from "./config.js"
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post("/disable/:id", (req, res)=>{
  console.log(req.body)
  console.log(req.headers.authorization)
  res.send({ok: 'true'})

})

app.listen(3000, ()=>{console.log("server started at port 3000")})