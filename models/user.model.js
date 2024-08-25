const mongoose = require('mongoose');

const validator = require('validator');
const userRoles = require('../untils/userRoles');

const userSchema = new mongoose.Schema({
    fristName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        validate:[ validator.isEmail , 'fialed must be valid email address']
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    role:{
        type:String, // ["USER", "ADMIN" , "MANEGER"]
        enum:[userRoles.USER, userRoles.ADMIN, userRoles.MANGER],
        default:userRoles.USER
    },
    avatar:{
        type:String,
        default:'uploads/profile.jpg'
    }
})

module.exports = mongoose.model('User', userSchema);