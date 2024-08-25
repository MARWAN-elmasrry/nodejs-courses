const express= require('express')

const router = express.Router();

const courseControl =require("../control/control")

const {validationSchema} = require('../middleWare/ValidationSchema');
const verifyToken = require('../middleWare/verifyToken');
const userRoles = require('../untils/userRoles');
const allowedTo = require('../middleWare/allowedTo');
// CRUD
router.route('/')
    .get(courseControl.getAllCourse)
    .post(verifyToken,allowedTo(userRoles.MANGER),validationSchema() ,courseControl.addCourse)

router.route('/:courseId')
    .get(courseControl.getCourse)
    .patch(courseControl.updateCourse)
    .delete(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANGER) ,courseControl.deleteCourse)

module.exports = router ;
