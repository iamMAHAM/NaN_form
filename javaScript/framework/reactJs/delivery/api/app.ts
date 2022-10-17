import express, { Express } from 'express';
import { config } from "dotenv"
import cors from "cors"

import userRoutes from "./routes/userRoutes"
import adminRoutes from "./routes/adminRoutes"

config()

const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)

app.listen(process.env.PORT, ()=>{
  console.log(
    'serveur demarré sur le port ' + process.env.PORT
  )
}) 
