const jwt =  require('jsonwebtoken')
const httpStatusText = require('../untils/httpStatusText')
const appError = require('../untils/appError')

// const verifyToken =(req, res , next)=>{
//     const authHeader = req.header['Authorization'] || req.header['authorization'];

//     const token = authHeader.split(' ')[1];

//     console.log("token", token);
//     next();
// } 
// module.exports=verifyToken;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        const error = appError.create('token is require' ,401, httpStatusText.ERROR)
        return next(error)
    }

    const token = authHeader.split(' ')[1];
    try{
        const currentUser = jwt.verify(token , process.env.JWT_SECRET_KEY)
        req.currentUser=currentUser;

        
        next();
    }catch(err){
        const error = appError.create('invaled token' ,401, httpStatusText.ERROR)
        return next(error)
    }

    // if (!token) {
    //     return res.status(401).json({ message: "Token is missing" });
    // }

    // console.log("decodedToken",decodedToken);
    
    // console.log("token", token);
};

module.exports = verifyToken;
