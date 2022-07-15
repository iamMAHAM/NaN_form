const users = require("../middlewares/users")

class UserController{

    static insertUser = (req, res)=>{
        if (validate(req.body)){
            if (users.createUser(req.body)){
                res.send(JSON.stringify(template("ok", {message: 'account created successfully'})))
            } else{
                res.send(JSON.stringify(template("false", {message: 'error with database'})))
            }
        }else{
            res.send(template("false", {message: 'some incorrect entries'}))
        }
    }

    static loginUser = (req, res)=>{
        users.checkLogin(req.body, (result)=>{
            if (result.res){
                req.app.set("user", result)
                res.redirect("/index")
            }
            else res.render("login-register")
        })
    }
}


module.exports = UserController