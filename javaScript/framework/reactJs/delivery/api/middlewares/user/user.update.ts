import User from "../../models/user.model";
import { Request } from "express";

const updateUser = ((req: Request, res: Response) => {
  return new Promise((resolve, reject) => {
    try {
      const userInfo = User.findById(req?.params?.id)
      // userInfo.save()
      // resolve(userInfo.toObject())
    } catch (e: unknown){
      reject(e)
    }
  })
})

export default updateUser