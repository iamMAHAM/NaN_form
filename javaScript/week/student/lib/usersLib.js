const db = require("../config/db")

class usersLib{

    static createUser = (opt={}, callback)=>{
        let res=  null
        db.query(
            `
            INSERT INTO \`student\`.\`users\` (\`username\`, \`email\`, \`password\`, \`birthday\`, \`phone\`, \`avatar\`)
            VALUES ('${opt.username}', '${opt.email}', '${opt.password}', '${opt.birthday}', '${opt.phone}', '${opt.avatar}');
            `
        , (err)=>{
            console.log(err)
            err ? res = false : res = true
            return callback(res)
        })
    }

    static checkLogin = (opt={}, callback)=>{
        console.log("opt", opt)
        db.query(`SELECT * FROM users WHERE (\`email\`= '${opt.email}'
        && \`password\`='${opt.password}')`, (err, result)=>{
            result = {
                res: result,
                type: 'login'
            }
            return callback(result)

        })
    }

    static UpdateInfo = (field, value, id, callback)=>{
        db.query(`UPDATE \`student\`.\`users\` SET \`${field}\` = '${value}' WHERE (\`id\` = '${id}');`)
        db.query(`SELECT * from users WHERE (id='${id}')`, (err, result)=>{
            res = {
                res: result,
                type: 'update'
            }
            return callback(res)
        })
    }

    static deleteUser = (id)=>{
        db.query(`DELETE FROM users WHERE (\`id\` = '${id}');`)
    }
}

module.exports = usersLib
