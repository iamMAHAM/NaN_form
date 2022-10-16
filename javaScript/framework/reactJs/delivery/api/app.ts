import express from "express"
import { config } from "dotenv"
import cors from "cors"

config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.listen(process.env.PORT, (err)=>{
    console.log(err
        ? err
        : 'serveur demarré sur le port ' + process.env.PORT
    )
})