const db = require("./mysql")

const createUser = (opt={})=>{
    
    db.query(
        `
        INSERT INTO train.users (\`name\`, \`email\`, \`password\`, \`birth\`, \`country\`, \`avatar\`, \`surname\`)
        VALUES ("${opt.name}", "${opt.email}", "${opt.password}", "${opt.birth}", "${opt.country}", "${opt.avatar}", "${opt.surname}")
        `
    , (err)=>{
        if (err){
            console.log(err)
            return false
        }
    })
    console.log("greakjhvbhjzvhjrefrehverfergvrebggtt")
    return true
}

const checkLogin = (opt={})=>{
    let status = null
    db.query("SELECT * FROM users", (err, result)=>{
        if (err) throw err
        console.log(opt)
        res = result.find(user =>{opt.email === user.email && opt.password === user.password})
        console.log(res)
        return {
            status: status,
            res: res
        }
    })
}

module.exports = {
    createUser: createUser,
    checkLogin: checkLogin,
}
