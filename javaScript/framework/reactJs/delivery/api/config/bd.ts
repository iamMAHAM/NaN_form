import mongoose from "mongoose";
import { config } from "dotenv";

config()

const connect = ()=>{
  if (process.env.STRING_URI){
    mongoose.connect(process.env.STRING_URI)
      .then(r => console.log('mongo connected'))
  }else{
    throw new Error("env variable STRING_URI is required")
  }
}

export default connect