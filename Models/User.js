const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 100
    },

    email: {
        type: String,
        min: 6,
        max: 100
    },
    password: {
        type: String,
        min: 6,
        max: 1024




    }
})

module.exports = mongoose.model('User', userSchema);