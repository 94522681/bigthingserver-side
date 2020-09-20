const express=require('express')
//创建路由
const router=express.Router()
// 路由处理函数分离
const userHandler=require('../Router_Handler/user')
//导入表单验证数据的中间件
const expressJoi=require('@escook/express-joi')
//导入需要的验证规则对象
const {reg_login_schema}=require('../schema/user')

//注册新用户
router.post('/register',expressJoi(reg_login_schema),userHandler.regUser)
router.post('/login',expressJoi(reg_login_schema),userHandler.login)

// exports 与 modele.exports 指向的是同一个对象 但是是以module.exports为准
// exports=router
module.exports=router