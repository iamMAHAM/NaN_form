let fs = require("fs")

let read = fs.createReadStream("v.mp4")
let write = fs.createWriteStream("copy.mp4")

read.on("data", (chunck)=>{
    console.log("jai lu : ", chunck.length)
})

read.pipe(write)

write.on("finish", ()=>{
    console.log("methode copie");
})