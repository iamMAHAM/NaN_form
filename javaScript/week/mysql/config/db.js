const mysql = require("mysql")

const mysqlConnection = mysql.createConnection({
    user: "debian-sys-maint",
    password: "pKwd5IO7PwwneA0r",
    database: "train"
})

mysqlConnection.connect((err)=>{
    if (err) throw err
})

module.exports = mysqlConnection