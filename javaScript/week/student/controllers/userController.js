const usersLib = require("../lib/usersLib")
const validate = require("../lib/validate")
const format = require("../lib/formatter")

class userController{
    static insertUser = (req, res)=>{
        if (validate(req.body)){
            usersLib.createUser(req.body, resl=>{
                if (resl) res.json(format("success", "account created successfully"))
                else res.json(format("false", "error with database"))
            })
        }
        else{
            res.json(format("false", "some incorrect entries"))
        }
    }

    static loginUser = (req, res)=>{
        usersLib.checkLogin(req.body, (result)=>{
            console.log(result)
            if (result.content.length){
                res.json(format("success", result.content[0]))
            }
            else res.json(format("false", "bad credential"))
        })
    }

    static updateUser = (req, res)=>{
        for (let prop in req.body){
            if (req.body[prop] !== '' && prop !== "id"){
                usersLib.UpdateInfo(prop, req.body)
            }
        }
        usersLib.selectUser(req.body.id, (user)=>{
            res.json(user)
        })
    }

    static deleteUser = (req, res)=>{
        console.log("delete", req.body)
        usersLib.deleteUser(req.body.id, (resl)=>{
            if (resl){
                res.json(format("success", "Account deleted Successfully"))
            }else res.json(format("error", "Can't delete your account currently"))
        })
    }

    
}

module.exports = userController