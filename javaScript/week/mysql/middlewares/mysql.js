const mysql = require("mysql")

const mysqlConnection = mysql.createConnection({
    user: "root",
    password: "pKwd5IO7PwwneA0r",
    database: "train"
})

mysqlConnection.connect((err)=>{
    if (err) throw err
})

module.exports = mysqlConnection