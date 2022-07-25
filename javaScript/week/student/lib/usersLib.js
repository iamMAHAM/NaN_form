const db = require("../config/db")
const format = require("./formatter")

class usersLib{

    static createUser = (opt={}, callback)=>{
        let res=  null
        db.query(
            `
            INSERT INTO \`student\`.\`users\` (\`username\`, \`email\`, \`password\`, \`birthday\`, \`phone\`, \`avatar\`)
            VALUES ('${opt.username}', '${opt.email}', '${opt.password}', '${opt.birthday}', '${opt.phone}', '${opt.avatar}');
            `
        , (err)=>{
            err ? res = false : res = true
            return callback(res)
        })
    }

    static checkLogin = (opt={}, callback)=>{
        db.query(`SELECT * FROM users WHERE (\`email\`= '${opt.email}'
        && \`password\`='${opt.password}')`, (err, result)=>{
            result = format("login", result)
            return callback(result)
        })
    }

    static UpdateInfo = (field, body)=>{
        db.query(`UPDATE \`student\`.\`users\` SET \`${field}\` = '${body[field]}' WHERE (\`id\` = '${body.id}');`)
    }

    static deleteUser = (id, callback)=>{
        db.query(`DELETE FROM users WHERE (\`id\` = '${id}');`, (err)=>{
            let stat = null
            console.log(err)
            err ? stat = false : stat = true
            return callback(stat)
        })
    }

    static selectUser(id, callback){
        db.query(`SELECT * from users WHERE (id='${id}')`, (err, result)=>{
            err ? console.log(err) : null
            result = format("update", result[0])
            return callback(result)
        })
    }

    static addSubject()
}

module.exports = usersLib
