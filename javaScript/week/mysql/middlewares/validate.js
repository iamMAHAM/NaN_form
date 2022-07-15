const validator = require("./validator")

const validate = (data={})=>{
    return (validator.validateEmail(data.email)
        && validator.validatePassword(data.password)
        && validator.validateString(data.name)
        && validator.validateString(data.surname)
        && validator.validateString(data.country)
    )
}

module.exports = validate