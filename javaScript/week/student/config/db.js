const mysql = require("mysql")

const mysqlConnection = mysql.createConnection({
    user: "root",
    password: "pKwd5IO7PwwneA0r",
    database: "student"
})


mysqlConnection.connect((err)=>{
    if (err) throw err
})

// mysqlConnection.query(`CREATE TABLE \`student\`.\`users\` (
//     \`id\` INT NOT NULL AUTO_INCREMENT,
//     \`username\` VARCHAR(50) NOT NULL,
//     \`email\` VARCHAR(45) NOT NULL,
//     \`password\` VARCHAR(25) NOT NULL,
//     \`birthday\` VARCHAR(10) NOT NULL,
//     \`phone\` VARCHAR(20) NULL DEFAULT 'CURRENT',
//     \`avatar\` VARCHAR(50) NOT NULL,
//     \`registered_at\` VARCHAR(50) GENERATED ALWAYS AS (CURRENT_TIMESTAMP),
//     PRIMARY KEY (`id`));`)

module.exports = mysqlConnection