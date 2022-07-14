const mysqlConnection = require("./middlewares/mysql")

const createUser = (opt={})=>{
    mysqlConnection.query(
        `
        INSERT INTO users
        (\`name\`, email, \`password\`, avatar)
        VALUES (${opt.name}, ${opt.email}, ${opt.password, opt.avatar})
        `
    )
}

const checkLogin = (opt={})=>{
    
}