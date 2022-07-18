const db = require("../config/db")

const createUser = (opt={}, callback)=>{
    let res=  null
    db.query(
        `
        INSERT INTO train.users (\`name\`, \`email\`, \`password\`, \`birth\`, \`country\`, \`avatar\`, \`surname\`)
        VALUES ("${opt.name}", "${opt.email}", "${opt.password}", "${opt.birth}", "${opt.country}", "${opt.avatar}", "${opt.surname}")
        `
    , (err)=>{
        err ? res = false : res = true
        return callback(res)
    })
}

const checkLogin = (opt={}, callback)=>{
    console.log("opt", opt)
    db.query("SELECT * FROM users", (err, result)=>{
        if (err) throw err
        res = result.find(user => opt.email === user.email && opt.password === user.password)
        res = {
            res: res,
            type: 'login'
        }
        return callback(res)
    })
    
}

const UpdateInfo = (field, value, id, callback)=>{
    db.query(`UPDATE \`train\`.\`users\` SET \`${field}\` = '${value}' WHERE (\`id\` = '${id}');`)
    db.query(`SELECT * from users WHERE (id='${id}')`, (err, result)=>{
        res = {
            res: result,
            type: 'update'
        }
        return callback(res)
    })
}

const deleteUser = (id)=>{
    db.query(`DELETE FROM users WHERE (id = '${id}');`)
}

module.exports = {
    createUser: createUser,
    checkLogin: checkLogin,
    UpdateInfo: UpdateInfo,
    deleteUser: deleteUser
}
