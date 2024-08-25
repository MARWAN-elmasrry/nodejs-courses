const {body}=require('express-validator')

const validationSchema= () => [
    body('title')
        .notEmpty()
        .withMessage("title is require")
        .isLength({min:2})
        .withMessage("title at least is 2"),
    body('price')
    .notEmpty()
    .withMessage("title is require")
    ]
    module.exports={
        validationSchema
    }