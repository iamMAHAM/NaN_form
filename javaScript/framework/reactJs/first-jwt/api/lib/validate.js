const validator = require("./validator")

const validate = (data={})=>{
    // console.log("email", validator.validateEmail(data.email))
    // console.log("pass", validator.validatePassword(data.password))
    // console.log("name", validator.validateString(data.name))
    // console.log("username", validator.validateString(data.surname))

    return (validator.validateEmail(data.email)
        && validator.validatePassword(data.password)
        && validator.validateString(data.name)
        && validator.validateString(data.surname)
    )
}

module.exports = validate