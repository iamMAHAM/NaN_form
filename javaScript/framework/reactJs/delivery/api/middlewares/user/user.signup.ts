import User from "../../models/user.model";
import { Request } from "express";


interface data{
  email: String,
  password: String
}
const signupUser = ((req: Request, res: Response) => {
  return new Promise((resolve, reject) => {
    try {
      const data: data = req.body
      const user = User.findOne({ email: data?.email})
      // const userInfo = new User(req.body)
      // User.findB
      // userInfo.save()
      // resolve(userInfo.toObject())
    } catch (e: unknown){
      reject(e)
    }
  })
})

export default signupUser