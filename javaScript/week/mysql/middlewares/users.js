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
    let res = null
    db.query("SELECT * FROM users", (err, result)=>{
        if (err) throw err
        res = result.find(user => opt.email === user.email && opt.password === user.password)
    })
    return res !== undefined
}

const UpdateInfo = (field, value)=>{
    db.query(`UPDATE \`train\`.\`users\` SET \`${field}\` = '${value}' WHERE (\`id\` = '23');`)
}

module.exports = {
    createUser: createUser,
    checkLogin: checkLogin,
    UpdateInfo: UpdateInfo
}
