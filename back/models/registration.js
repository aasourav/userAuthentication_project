const mongoose = require('mongoose')
const UserReg = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
})

const UserModel = mongoose.model('User',UserReg)
module.exports = UserModel;