import express, { Express } from 'express';
import { config } from "dotenv"
import connect from './config/bd';
import cors from "cors"

import userRoutes from "./routes/user.routes"
import adminRoutes from "./routes/admin.routes"

config()

const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)


connect()
.then(()=>{
  app.listen(process.env.PORT || 3000, ()=>{
    console.log(
      'serveur demarré sur le port ' + process.env.PORT
    )
  }) 
})
.catch(e =>{
  console.log('app not started reason : ')
  console.error(e)
})
