import { Router, Request, Response } from "express"
import connect from "../config/bd"
const routes: Router = Router()

routes.get('/info', (req: Request, res: Response) => {
  res.json({status: true, response: 'salut jeune'})
})

routes.post("/signup", (req: Request, res: Response) =>{
  res.send("signup")
})

routes.post("/login", (req: Request, res: Response) =>{
  res.send("login")
})

routes.put('/update', (req: Request, res: Response) => {
  res.send("update")
})

export default routes
 