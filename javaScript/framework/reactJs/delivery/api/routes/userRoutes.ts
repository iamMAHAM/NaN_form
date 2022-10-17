import { Router, Request, Response } from "express"

const routes: Router = Router()

routes.get('/', (req: Request, res: Response)=>{
  res.json({status: true, response: 'salut jeune'})
})

export default routes
