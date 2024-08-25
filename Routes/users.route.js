const express= require('express')

const router = express.Router();

const multer = require('multer')

const diskStorge = multer.diskStorage({
    destination : function(req, file , cb){
        console.log("FILE",file);
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        const ext =  file.mimetype.split('/')[1]; 
        const fileName= `user-${Date.now()}.${ext}`
        cb(null,fileName)
    }
})

const fileFilter=(req,file,cb)=>{
    const imageType= file.mimetype.split('/')[0]
    if(imageType == 'image'){
        return cb(null,true)
    }else{
        return cb(appError.create('file must be img',400))
    }
}
const upload = multer({
    storage: diskStorge,
    fileFilter
})

const usersControl = require('../control/users')

const verifyToken = require('../middleWare/verifyToken');
const appError = require('../untils/appError');
// get all user

// resgiter

// login

router.route('/')
    .get(verifyToken, usersControl.getAllUsers)
router.route('/resgiter')
    .post(upload.single('avatar'),usersControl.resgiter)
router.route('/login')
    .post(usersControl.login)
module.exports = router;
