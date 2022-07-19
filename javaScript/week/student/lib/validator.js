const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
}

const validatePassword = (pw)=>{
  return /[A-Z]/       .test(pw) &&
         /[a-z]/       .test(pw) &&
         /[0-9]/       .test(pw) &&
         /[^A-Za-z0-9]/.test(pw) &&
         pw.length > 7

}

const validateString = (str)=>{
  return (typeof str === "string" && str.length > 0)
}


module.exports = {
    validateEmail: validateEmail,
    validatePassword, validatePassword,
    validateString, validateString
}
