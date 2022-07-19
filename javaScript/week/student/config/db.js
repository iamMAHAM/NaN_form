const mysql = require("mysql")

const mysqlConnection = mysql.createConnection({
    user: "root",
    password: "pKwd5IO7PwwneA0r",
    database: "train"
})


mysqlConnection.connect((err)=>{
    if (err) throw err
})

// mysqlConnection.query(`CREATE TABLE IF NOT EXISTS \`train\`.\`users\` (
//     \`id\` INT NOT NULL,
//     \`name\` VARCHAR(45) NOT NULL,
//     \`email\` VARCHAR(50) NOT NULL,
//     \`password\` VARCHAR(45) NOT NULL,
//     \`birth\` VARCHAR(45) NOT NULL,
//     \`country\` VARCHAR(45) NOT NULL,
//     \`surname\` VARCHAR(45) NOT NULL,
//     \`avatar\` VARCHAR(150) NULL,
//     PRIMARY KEY (\`id\`));`)

module.exports = mysqlConnection