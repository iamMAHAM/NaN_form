const mongoose = require("mongoose")
const Schema = mongoose.Schema

const usersSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },

    age:{
        type: Number,
        required: true
    }
}, {timestamps: true})

const users = mongoose.model("users", usersSchema)

module.exports = users
