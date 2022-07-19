const validator = require("./validator")

const validate = (data={})=>{
    // console.log("email", validator.validateEmail(data.email))
    // console.log("pass", validator.validatePassword(data.password))
    // console.log("username", validator.validateString(data.username))
    // console.log("birthday", validator.validateString(data.birthday))

    return (validator.validateEmail(data.email)
        && validator.validatePassword(data.password)
        && validator.validateString(data.username)
        && validator.validateString(data.birthday)
    )
}

module.exports = validate