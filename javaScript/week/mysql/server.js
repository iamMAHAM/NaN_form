const express = require("express")
const app = express()
const mysqlConnection  =require("./middlewares/mysql")

app.get("/", (req, res)=>{
    mysqlConnection.query("SELECT * FROM users", (err, result, fields)=>{
        if (err) throw err
        console.log(result[0])
    })
    res.send("ok")
})

app.listen(3000, ()=>{
    console.log("server started")
})