const mysql = require("mysql")

const mysqlConnection = mysql.createConnection({
    user: "root",
    password: "JxDkfe#3N%eEkqB1",
    database: "jwt"
})


mysqlConnection.connect((err)=>{
    if (err) throw err
})

// mysqlConnection.query(`CREATE TABLE IF NOT EXISTS \`jwt\`.\`users\` (
//     \`id\` INT NOT NULL AUTO_INCREMENT,
//     \`name\` VARCHAR(45) NOT NULL,
//     \`email\` VARCHAR(50) NOT NULL,
//     \`password\` VARCHAR(45) NOT NULL,
//     \`birth\` VARCHAR(45) NOT NULL,
//     \`country\` VARCHAR(45) NOT NULL,
//     \`surname\` VARCHAR(45) NOT NULL,
//     \`avatar\` VARCHAR(150) NULL,
//     PRIMARY KEY (\`id\`));`)

module.exports = mysqlConnection