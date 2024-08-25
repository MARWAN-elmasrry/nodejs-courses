const asyncWrapper = require('../middleWare/asyncWrapper');
const User = require('../models/user.model')
const httpStatusText = require('../untils/httpStatusText');
const appError = require('../untils/appError');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const generateJWT = require('../untils/generate.JWT');


const getAllUsers =  asyncWrapper(
    async (req,res)=>{ 

    // console.log(req.headers)

        const query = req.query
        // console.log("query" , query);

    const limit =query.limit || 10;
    const page = query.page || 1;
    const skip= (page - 1) * limit;
    // get all From Database
    const users = await User.find({},{"__v":false,"password":false}).limit(limit).skip(skip); 
    res.json({
        status:httpStatusText.SUCCESS,
        data:{users: users}
    });

})

const resgiter = asyncWrapper(async (req,res,next)=>{
    const {fristName ,lastName ,email , password, role } = req.body    

    const oldUser = await User.findOne({email: email});

    if (oldUser) {
        const error = appError.create('this email is exists' ,400, httpStatusText.FAIL)
        return next(error)
    }
    // password hashing
    const hashedPassword = await bcrypt.hash(password , 10)

    const newUser = new User({
        fristName,
        lastName,
        email,
        password: hashedPassword,
        role,
        avatar: req.file.filename
    })

    // genrate JWT token
    const token = await generateJWT({email: newUser.email,id:newUser._id , role:newUser.role})
    newUser.token= token

    await newUser.save();

    res.status(201).json({
        status:httpStatusText.SUCCESS,
        data:{user: newUser}
    })

})

const login = asyncWrapper(async( req ,res ,next)=>{
    const {email, password}=req.body

    if(!email && !password){
        const error = appError.create('email and password are require' ,400, httpStatusText.FAIL)
        return next(error)
    }

    const user = await User.findOne({email: email})

    if(!user){
        const error = appError.create('user not found' ,400, httpStatusText.FAIL)
        return next(error)
    }

    const matchedPassword = await bcrypt.compare(password, user.password)


    if (user && matchedPassword){
        // logged in done
        const token = await generateJWT({email: user.email,id:user._id, role:user.role })

        return res.json({
            status:httpStatusText.SUCCESS,
            data:{token}
        })
    }else{
        const error = appError.create('something wrong' ,500, httpStatusText.ERROR)
        return next(error)
    }
})

module.exports={
    getAllUsers,
    resgiter,
    login
}