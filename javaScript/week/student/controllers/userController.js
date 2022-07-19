const users = require("../lib/usersLib")
const validate = require("../lib/validate")
const template = (status="", data={})=>{
    return {
        status: status,
        results: data
    }
}

class userController{

    static insertUser = (req, res)=>{
        if (validate(req.body)){
            usersLibcreateUser(req.body, resl=>{
                if (resl) res.send(JSON.stringify(template("ok", {message: 'account created successfully'})))
                else res.send(JSON.stringify(template("false", {message: 'error with database'})))
            })
        }
        else{
            res.send(template("false", {message: 'some incorrect entries'}))
        }
    }

    static loginUser = (req, res)=>{
        usersLibcheckLogin(req.body, (result)=>{
            if (result.res){
                req.app.set("user", result)
                res.send(JSON.stringify({
                    status: "true",
                    message: result.res
                }))
            }
            else res.send(JSON.stringify({
                status: "false",
                message: "bad credential"
            }))
        })
    }

    static updateUser = (req, res)=>{
        let user = null
        for (let prop in req.body){
            if (req.body[prop] !== '' && prop !== "id"){
                usersLibUpdateInfo(prop, req.body[prop], req.body.id, (new_user)=>{
                    console.log("new user", new_user)
                    new_user !== undefined ? user = new_user : null
                    res.send(JSON.stringify(new_user))
                })
            }
        }
    }

    static deleteUser = (req, res)=>{
        usersLibdeleteUser(req.body.id)
        res.send(JSON.stringify({status: "ok"}))
    }
}

module.exports = userController