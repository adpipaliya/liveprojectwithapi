const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    uname:String,
    pswd:String
})

module.exports = mongoose.model('User',userSchema);