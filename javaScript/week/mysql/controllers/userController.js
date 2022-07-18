const users = require("../lib/users")
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
            users.createUser(req.body, resl=>{
                if (resl) res.send(JSON.stringify(template("ok", {message: 'account created successfully'})))
                else res.send(JSON.stringify(template("false", {message: 'error with database'})))
            })
        }
        else{
            res.send(template("false", {message: 'some incorrect entries'}))
        }
    }

    static loginUser = (req, res)=>{
        users.checkLogin(req.body, (result)=>{
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
        for (prop in req.body){
            if (req.body[prop] !== ''){
                users.UpdateInfo(prop, req.body[prop], req.app.get("user").res.id, (new_user)=>{
                    req.app.set("user", new_user)
                })
            }
        }
        res.redirect("/index")
    }

    static deleteUser = (req, res)=>{
        users.deleteUser(req.body.message.res.id)
        res.send(JSON.stringify({
            status: "success"
        }))
    }
}


module.exports = userController